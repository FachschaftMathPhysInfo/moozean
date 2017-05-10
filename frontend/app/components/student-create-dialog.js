import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    exitDialog:function(option){
      console.log(option);
      this.sendAction('closeDialog',option,this.get('student'));
    }
  }
});
