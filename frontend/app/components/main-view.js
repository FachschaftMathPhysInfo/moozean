import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
      didInsertElement() {
        if (this.get('studentselected')) {
          $('md-autocomplete-wrap input').focus();
        }
      },
      focusStudentSelection: Ember.observer('studentselected', function() {
          if (!this.get('studentselected')) {
            Ember.run.schedule('afterRender', this, function(){
                $('div.md-chip-input-container input').focus();
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
          return this.get('newstudent.uniid') != undefined ;
        }),
        studentselected: Ember.computed('student', function() {
          return this.get('student') == null;
        }),
        no_lent_selected:Ember.computed('studentselected','ordner', function() {
          return (this.get("studentselected") || this.get('ordner')==[]);
        }),
        nicht_ausleihbar: Ember.computed('studentselected', 'student.refund', 'ordner.length', 'ordner', 'ordner.[]', function() {
          var refund = this.get('student.refund');
          var contains_obligation = false;
          var folders = this.get('ordner');
          folders.forEach(function(item) {
            console.log(item.get('folderseries.obligationtoreport'));
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
                this.get('newstudent').save().then(foo(this), function(reason) {
                  alert(reason); //TODO: FIXME
                })
              else this.get('newstudent').content.save().then(foo(this), function(reason) {
                alert(reason); //TODO: FIXME
              });
            }
            else if(option == 'delete'){
              this.get('newstudent').then((item)=>{
                item.destroyRecord().then(()=>{
                  this.sendAction('reload_lents');
                });
              });

            }
            else {
              if (this.get('newstudent').unloadRecord != null)
                this.get('newstudent').unloadRecord();


            }
            this.set("showDialog", false);
            $('md-autocomplete-wrap input').focus();
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
            })
          },
          saveModel: function(student) {
            if(!this.get('nicht_ausleihbar')){
            let folders = this.get('ordner');
            for (var i = 0; i < folders.length; i++) {
              var store = this.get('store');
              let lent = store.createRecord('lent', {
                student: this.get('student'),
                folder: folders[i]
              });
              lent.save().then(function(_this, f) {
                return function() {
                  _this.set('currentStep', 0);
                  _this.set('student', null);
                  _this.get('ordner').removeObject(f);
                  $('md-autocomplete-wrap input').focus();
                }
              }(this, folders[i]));
            }
          }
          else{
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
          closepfand: function(option, student) {
            this.set('showPfandDialog', false);
            if (option == "ok") {
              student.set('refund', true);
              student.save();
              this.send('saveModel');
            }
            else {
              var folders = this.get('ordner');
              folders.forEach(function(item){
                if(item.get('folderseries.obligationtoreport')) folders.removeObject(item);
              })
              $('div.md-chip-input-container input').focus();
            }
          },
          showPfandDialog: function() {
            this.set('showPfandDialog', true);
          },
          clearWhenBack:function(step){
            if(!this.get('studentselected') && step==0){
              this.set('student',null);
              Ember.run.schedule('afterRender', this, function(){
              $('md-autocomplete-wrap input').focus();
            });
            }
          }
        }
      });
