import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    deleteInmail:function(mail){
      mail.destroyRecord();
    }
  }
});
