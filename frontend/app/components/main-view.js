import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import moment from 'moment';
export default Component.extend({
  store: service(),
  items: [],
  titlestudent: "Studierendes eintragen",
  bleibendeOrdner: [{
    name: "KP1A"
  }, {
    name: "KM1A"
  }],
  ordner: [],
  toggleMenu: true,
  newstudent: {},
  sumordner: computed('ordner.[]', function() {
    var result = [];
    var ordner = this.get('ordner');
    ordner.forEach(function(item) {
      result.push(item.get('name'));
    });
    return result;
  }),
  student: null,
  deletable: computed('newstudent', function() {
    return this.get('newstudent.uniid') != undefined;
  }),
  studentselected: computed('student', function() {
    return this.get('student') == null;
  }),
  no_lent_selected: computed('studentselected', 'ordner', function() {
    return (this.get("studentselected") || this.get('ordner') == []);
  }),
  nicht_ausleihbar: computed('studentselected', 'student.refund', 'ordner.length', 'ordner', 'ordner.[]', function() {
    if (this.get('student.refund') || this.get('student.report')) {
      return false;
    }
    var contains_obligation = false;
    this.get('ordner').forEach(function(item) {
      contains_obligation |= item.get('obligationtoreport');
    });
    return contains_obligation;
  }),
  showDialog: false,

  actions: {
    editStudent: function(student) {
      this.set('newstudent', student);
      this.set('titlestudent', 'Studierendes bearbeiten');
      this.set("showDialog", true);
    },
    closeDialog: function(option) {
      var store = this.get('store');
      if (option == "ok") {
        let foo = function(_this) {
          return function() {
            _this.set('student', _this.get('newstudent'));
            _this.set('newstudent', store.createRecord('student'));
            _this.set("showDialog", false);
            _this.set('currentStep', 1);
          }
        };
        if (this.get('newstudent').save != null)
          this.get('newstudent').save().then(foo(this))
        else this.get('newstudent').content.save().then(foo(this));
        this.set('currentStep', 1)
        this.$('md-chip-input-container input').focus();
      }else if(option == 'delete'){
        this.get('newstudent').then((item)=>{
          item.get('lents').then((item)=>{
            item.forEach((lent)=>{
              lent.unloadRecord();
            });
          });
          item.destroyRecord();
        });
          this.set('showDialog', false);
          this.set('currentStep', 0);
          this.$('md-autocomplete-wrap input').focus();
      }else{
        if(this.get('newstudent.id')!=null){
          this.get('newstudent').then((item)=>{
            item.rollbackAttributes();
          });
        }
        else{
          this.get('newstudent').destroyRecord();
        }
        this.set('showDialog', false);
        this.$('md-autocomplete-wrap input').focus();
      }
    },
    addStudent: function() {
      var store = this.get('store');
      this.set('newstudent', store.createRecord('student'));
      this.set("showDialog", true);
    },
    searchStudent: function(data) {
      var store = this.get('store');
      return store.query('student', {
        filter: {
          nameoruniid: '%' + data + '%'
        },
        page: {
          limit: 10
        }
      })
    },
    saveModel: function() {
      if (!this.get('nicht_ausleihbar')) {
        let folders = this.get('ordner');
        var store = this.get('store');
        folders.forEach((folder)=>{
          let lent = store.createRecord('lent', {
                    student: this.get('student'),
                    folder: folder
                  });
                  lent.save().then(function(_this, f) {
                    return function() {
                      _this.set('currentStep', 0);
                      _this.set('student', null);
                      _this.get('ordner').removeObject(f);
                      _this.$('md-autocomplete-wrap input').focus();
                      // _this.sendAction('reload_lents');
                    }
                  }(this, folder));
                });
      } else {
        this.set('showPfandDialog', true);
      }
    },
    addFolder: function(data) {
      this.ordner.pushObject(data);
    },
    removeFolder: function(data) {
      this.ordner.removeObject(data);
    },
    giveBack: function(lent) {
      var store = this.get('store');
      let returned = store.createRecord('returned', {
        lentat: lent.get('createdAt'),
        student: lent.get('student'),
        folder: lent.get('folder')
      });
      returned.save();
      lent.destroyRecord();
    },
    mail: function(lent) {
      //alert("Mail an "+lent.get('student.name')+" versandt!");
      this.set('showMailDialog', true);
      var store = this.get('store');
      this.set('newmail', store.createRecord('email', {
        referencable: lent,
        subject: "Ordner " + lent.get('folder.name'),
        body: "Hallo " + lent.get('student.name').split(" ")[0] + ",\nlaut unserer Datenbank hast du seit dem " + moment(lent.get('createdAt')).format("ll") +
          " den Ordner " + lent.get('folder.name') + " ausgeliehen.\n" +
          "\n" +
          "Das ist generell auch noch kein großes Problem. Allerdings haben wir nur wenige Ordner, die " +
          "eigentlich nur zum Kopieren ausgeliehen werden sollten. Deswegen wäre es schön, wenn du ihn " +
          "bald wieder zurückbringst. :))\n " +
          "\n" +
          "Falls du von dieser Mail unglaublich verwirrt bist, weil du dich nicht erinnern kannst, jemals " +
          "einen solchen Ordner ausgeliehen zu haben, sag uns, dass wir wohl der falschen Person " +
          "geschrieben haben. ;)\n " +
          "\n" +
          "Viele Grüße,\n" +
          "deine Fachschaft MathPhysInfo",
        address: lent.get('student.uniid') + "@ix.urz.uni-heidelberg.de"
      }));
    },
    closeMailDialog: function(option) {
      this.set('showMailDialog', false);
      if (option == "ok") {
        this.get('newmail').save();
      } else {
        if (this.get('newmail').unloadRecord != null)
          this.get('newmail').unloadRecord();
      }
    },
    closePfand: function(option, student) {

      if (option == "ok") {
        student.set('refund', true);
        student.save().then(() => {
          this.set('showPfandDialog', false);
        });
        this.send('saveModel');
      } else {
        var folders = this.get('ordner');
        folders.forEach(function(item) {
          if (item.get('folderseries.obligationtoreport')) folders.removeObject(item);
        })
        this.$('div.md-chip-input-container input').focus();
        this.set('showPfandDialog', false);
      }
    },
    showPfandDialog: function() {
      this.set('showPfandDialog', true);
    },
    clearWhenBack: function(step) {
      if (!this.get('studentselected') && step == 0) {
        this.set('student', null);
        schedule('afterRender', this, function() {
          this.$('md-autocomplete-wrap input').focus();
        });
      }
    },
    searchFolders:function(data){
      return this.store.query('folder', { filter: {name:data}});
    },
    focusFolderSelection:function(step){
      if (this.get('student') && step == 1) {
        schedule('afterRender', this, function() {
          this.$('div.md-chip-input-container input').focus();
        });
      }
    }
  }
});
