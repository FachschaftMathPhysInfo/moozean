import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    exitDialog:function(option){
      this.sendAction('closeDialog',option,this.get('student'));
    }
  }
});
