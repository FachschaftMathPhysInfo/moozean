import Component from '@ember/component';

export default Component.extend({
  deletable:false,
  didInsertElement(){
    this.$('#nameinput input').focus();
  },
  actions:{
    exitDialog:function(option){
      // eslint-disable-next-line ember/closure-actions
      this.sendAction('closeDialog',option,this.get('student'));
    },
    repay:function(stud){
      stud.set('refund',false);
    }
  }
});
