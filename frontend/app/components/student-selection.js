import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import studentManagment from "ember-ozean/mixins/student-managment";
export default Component.extend(studentManagment,{
  store: service(),
  didInsertElement(){
    if (this.student==null) {
      this.$('md-autocomplete-wrap input').focus();
    }
  },
  init() {
    this._super(...arguments);
    
    this.newstudent = this.newstudent || {};
  },
  showDialog: false,
  deletable: computed('newstudent', function() {
    return this.get('newstudent.uniid') != undefined ;
  }),
  closeOkDialog: function(store) {
    let foo = function(_this) {
      return function() {
        _this.set('student', _this.get('newstudent'));
        _this.set('newstudent', store.createRecord('student'));
        _this.set("showDialog", false);
      }
    };
    if (this.newstudent.save != null)
      this.newstudent.save().then(foo(this), function(reason) {
        alert(reason); //TODO: FIXME
      })
    else this.newstudent.content.save().then(foo(this), function(reason) {
      alert(reason); //TODO: FIXME
    });
    foo();
  },
  actions:{
    closeDialog: function(option) {
      var store = this.store;
      let foo = ()=>{
        schedule('afterRender', this, ()=>{
          this.set('student', store.createRecord('student'));
          this.set('newstudent','');
          this.set("showDialog", false);
        this.$('md-autocomplete-wrap input').focus();
          });
      }
      if (option == "ok") {
        this.closeOkDialog(store);
      }
      else if(option == 'delete'){
        this.student.destroyRecord().then(()=>{
          foo();
        });
      }
      else {
        this.newstudent.rollbackAttributes();
        foo();
      }
    },
    searchStudent: function(data) {
      var store = this.store;
      return store.query('student', {
        filter: {
          nameoruniid: '%' + data + '%',
        },
        page: {
          limit: 10
        }
      })
    },
    editStudent: function(){
      if(this.student!=null && this.get('student.name')!=''){
        this.set('newstudent',this.student);
        this.set("showDialog",true);
      }
    }
  }
});
