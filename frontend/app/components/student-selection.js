import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  didInsertElement(){
    if (this.get('student')==null) {
      $('md-autocomplete-wrap input').focus();
    }
  },
  newstudent:{},
  showDialog: false,
  deletable: Ember.computed('newstudent', function() {
    return this.get('newstudent.uniid') != undefined ;
  }),
  actions:{
    closeDialog: function(option) {
      var store = this.get('store');
      let foo = (what)=>{

        Ember.run.schedule('afterRender', this, (how)=>{
          this.set('student', store.createRecord('student'));
          this.set('newstudent','');
          this.set("showDialog", false);
        $('md-autocomplete-wrap input').focus();
          });
      }
      if (option == "ok") {
        let foo = function(_this) {
          return function() {
            _this.set('student', _this.get('newstudent'));
            _this.set('newstudent', store.createRecord('student'));
            _this.set("showDialog", false);
          }
        };
        if (this.get('newstudent').save != null)
          this.get('newstudent').save().then(foo(this), function(reason) {
            alert(reason); //TODO: FIXME
          })
        else this.get('newstudent').content.save().then(foo(this), function(reason) {
          alert(reason); //TODO: FIXME
        });
        foo();
      }
      else if(option == 'delete'){
        this.get('student').destroyRecord().then((item)=>{
          foo();
        });
      }
      else {
        foo();
      }

    },
    searchStudent: function(data) {
      var store = this.get('store');
      return store.query('student', {
        filter: {
          nameoruniid: '%' + data + '%',
        },
        page: {
          limit: 10
        }
      })
    },
    addStudent:function(){
      var store = this.get('store');
      this.set('newstudent',store.createRecord('student'));
      this.set("showDialog",true);
    },
    editStudent: function(){
      if(this.get('student')!=null && this.get('student.name')!=''){
        this.set('newstudent',this.get('student'));
        this.set("showDialog",true);
      }
    }
  }
});
