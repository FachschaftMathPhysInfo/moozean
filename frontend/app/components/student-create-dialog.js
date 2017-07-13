import Ember from 'ember';

export default Ember.Component.extend({
  deletable:false,
  didInsertElement(){
    $('#nameinput input').focus();
  },
  actions:{
    exitDialog:function(option){
      this.sendAction('closeDialog',option,this.get('student'));
    }
  }
});
