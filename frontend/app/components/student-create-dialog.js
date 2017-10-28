import Ember from 'ember';

export default Ember.Component.extend({
  deletable:false,
  didInsertElement(){
    this.$('#nameinput input').focus();
  },
  actions:{
    exitDialog:function(option){
      this.sendAction('closeDialog',option,this.get('student'));
    },
    repay:function(stud){
      stud.set('refund',false);
    }
  }
});
