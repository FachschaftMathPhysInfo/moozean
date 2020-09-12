import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import moment from 'moment';
import studentManagment from "ember-ozean/mixins/student-managment";
export default Component.extend(studentManagment,{
  store: service(),
  init() {
    this._super(...arguments);
    
    this.items = this.items || [];
    this.bleibendeOrdner = this.bleibendeOrdner || [{
      name: "KP1A"
    }, {
      name: "KM1A"
    }];
    this.ordner = this.ordner || [];
    this.newstudent = this.newstudent || {};
  },
  titlestudent: "Studierendes eintragen",
  toggleMenu: true,
  sumordner: computed('ordner.[]', function() {
    var result = [];
    var ordner = this.ordner;
    ordner.forEach(function(item) {
      result.push(item.get('name'));
    });
    return result;
  }),
  fkw:null,
  student: null,
  deletable: computed('newstudent', function() {
    return this.get('newstudent.uniid') != undefined;
  }),
  studentselected: computed('student', function() {
    return this.student == null;
  }),
  no_lent_selected: computed('studentselected', 'ordner', function() {
    return this.studentselected || this.ordner == [];
  }),
  nicht_ausleihbar: computed('studentselected', 'student.refund', 'ordner.length', 'ordner', 'ordner.[]', function() {
    if (this.get('student.refund') || this.get('student.report')) {
      return false;
    }
    var contains_obligation = false;
    this.ordner.forEach(function(item) {
      contains_obligation |= item.get('obligationtoreport');
    });
    return contains_obligation;
  }),
  showDialog: false,
  closeOkDialog:function(store) {
    let foo = function(_this) {
      return function() {
        _this.set('student', _this.get('newstudent'));
        _this.set('newstudent', store.createRecord('student'));
        _this.set("showDialog", false);
        _this.set('currentStep', 1);
      }
    };
    if (this.newstudent.save != null)
      this.newstudent.save().then(foo(this))
    else this.newstudent.content.save().then(foo(this));
    this.set('currentStep', 1);
  },
  closeDeleteDialog: function() {
    this.newstudent.then((item)=>{
      item.get('lents').then((item)=>{
        item.forEach((lent)=>{
          lent.unloadRecord();
        });
      });
      item.destroyRecord();
    });
      this.set('showDialog', false);
      this.set('currentStep', 0);
  },
  foldersearch:function(keyword){
    this.set('fkw',keyword);
    let a=this.store.query('folder', { filter: {lentsearch:keyword}});
    return a;
  },
  actions: {
    editStudent: function(student) {
      this.set('newstudent', student);
      this.set('titlestudent', 'Studierendes bearbeiten');
      this.set("showDialog", true);
    },
    closeDialog: function(option) {
      var store = this.store;
      if (option == "ok") {
        this.closeOkDialog(store);
      }else if(option == 'delete'){
        this.closeDeleteDialog(store);
      } else if(this.get('newstudent.id')!=null){
        this.newstudent.then((item)=>{
        item.rollbackAttributes();
        });
      } else{
        this.newstudent.destroyRecord();
      }
      this.set('showDialog', false);
      this.$('md-chip-input-container input').focus();
    },
    searchStudent: function(data) {
      var store = this.store;
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
      if (!this.nicht_ausleihbar) {
        let folders = this.ordner;
        var store = this.store;
        folders.forEach((folder)=>{
          let lent = store.createRecord('lent', {
                    student: this.student,
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
      var store = this.store;
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
      var store = this.store;
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
        this.newmail.save();
      } else {
        if (this.newmail.unloadRecord != null)
          this.newmail.unloadRecord();
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
        var folders = this.ordner;
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
      if (!this.studentselected && step == 0) {
        this.set('student', null);
        schedule('afterRender', this, function() {
          this.$('md-autocomplete-wrap input').focus();
        });
      }
    },
    searchFolders:function(data){
      return this.foldersearch(data);
    },
    firstFolder:function(){
      return this.foldersearch(this.fkw).get('firstObject');
    },
    focusFolderSelection:function(step){
      if (this.student && step == 1) {
        schedule('afterRender', this, function() {
          this.$('div.md-chip-input-container input').focus();
        });
      }
    }
  }
});
