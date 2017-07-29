import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  didInsertElement() {
    if (this.get('studentselected')) {
      this.$('md-autocomplete-wrap input').focus();
    }
  },
  focusStudentSelection: Ember.observer('studentselected', function() {
    if (!this.get('studentselected')) {
      Ember.run.schedule('afterRender', this, function() {
        this.$('div.md-chip-input-container input').focus();
      });
    }
  }),
  store: Ember.inject.service(),
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
  sumordner: Ember.computed('ordner.[]', function() {
    var result = [];
    var ordner = this.get('ordner');
    ordner.forEach(function(item) {
      result.push(item.get('name'));
    });
    return result;
  }),
  student: null,
  deletable: Ember.computed('newstudent', function() {
    return this.get('newstudent.uniid') != undefined;
  }),
  studentselected: Ember.computed('student', function() {
    return this.get('student') == null;
  }),
  no_lent_selected: Ember.computed('studentselected', 'ordner', function() {
    return (this.get("studentselected") || this.get('ordner') == []);
  }),
  nicht_ausleihbar: Ember.computed('studentselected', 'student.refund', 'ordner.length', 'ordner', 'ordner.[]', function() {
    var refund = this.get('student.refund');
    var contains_obligation = false;
    var folders = this.get('ordner');
    folders.forEach(function(item) {
      contains_obligation |= item.get('folderseries.obligationtoreport');
    });
    if (refund) {
      contains_obligation = false;
    }
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
          this.get('newstudent').save().then(foo(this), this.actions.ajaxError.bind(this))
        else this.get('newstudent').content.save().then(foo(this), this.actions.ajaxError.bind(this));
        this.set('currentStep', 1)
        this.$('md-chip-input-container input').focus();
      } else if (option == 'delete') {
        this.get('newstudent').then((item) => {
          this.set('showDialog', false);
          item.destroyRecord().then(() => {
            this.sendAction('reload_lents');
          });
          this.set('currentStep', 0);
          this.set('showDialog', false);
          this.$('md-autocomplete-wrap input').focus();
        });
      } else {
        if (this.get('newstudent').unloadRecord != null)
          this.get('newstudent').unloadRecord();
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
          name: '%' + data + '%'
        },
        page: {
          limit: 10
        }
      }).catch(this.actions.ajaxError.bind(this))
    },
    saveModel: function() {
      if (!this.get('nicht_ausleihbar')) {
        let folders = this.get('ordner');
        var store = this.get('store');
        folders.forEach((folder)=>{
          store.query('lent', {
            filter: {
              folder: folder.id
            }}).then((lents)=>{
             return lents.get('firstObject');
           }).then((lent)=>{
              console.log(lent);
              if(lent!=null){
                lent.destroyRecord().then(()=>{
                  let lent = store.createRecord('lent', {
                    student: this.get('student'),
                    folder: folder
                  });
                  lent.save().then(function(_this, f) {
                    return function() {
                      _this.set('currentStep', 0);
                      _this.set('student', null);
                      _this.get('ordner').removeObject(f);
                      $('md-autocomplete-wrap input').focus();
                    }
                  }(this, folder));
                });
              }
              else {
                let lent = store.createRecord('lent', {
                  student: this.get('student'),
                  folder: folder
                });
                lent.save().then(function(_this, f) {
                  return function() {
                    _this.set('currentStep', 0);
                    _this.set('student', null);
                    _this.get('ordner').removeObject(f);
                    $('md-autocomplete-wrap input').focus();
                  }
                }(this, folder));
              }
        });
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
        body: "Hallo " + lent.get('student.name') + ",\n\nLaut unserer Datenbank hast du seit dem " + moment(lent.get('createdAt')).format("ll") +
          " den Ordner " + lent.get('folder.name') + " ausgeliehen.\n" +
          "\n " +
          "Das ist generell auch noch kein großes Problem. Allerdings haben wir nur wenige Ordner, die \n " +
          "eigentlich nur zum Kopieren ausgeliehen werden sollten. Deswegen wäre es schön, wenn du ihn \n " +
          "bald wieder zurückbringst :))\n " +
          "\n" +
          "Falls du von dieser Mail unglaublich verwirrt bist, weil du dich nicht erinnern kannst, jemals \n " +
          "einen solchen Ordner ausgeliehen zu haben, sag uns, dass wir wohl der falschen Person \n " +
          "geschrieben haben ;)\n " +
          "\n " +
          "Viele Grüße\n " +
          "Deine Fachschaft-MathPhys",
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
        }, this.actions.ajaxError.bind(this));
        this.send('saveModel');
      } else {
        var folders = this.get('ordner');
        folders.forEach(function(item) {
          if (item.get('folderseries.obligationtoreport')) folders.removeObject(item);
        })
        this.$('div.md-chip-input-container input').focus();
      }
    },
    showPfandDialog: function() {
      this.set('showPfandDialog', true);
    },
    clearWhenBack: function(step) {
      if (!this.get('studentselected') && step == 0) {
        this.set('student', null);
        Ember.run.schedule('afterRender', this, function() {
          this.$('md-autocomplete-wrap input').focus();
        });
      }
    }
  }
});
