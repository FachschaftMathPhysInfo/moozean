import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    deleteInmail:function(mail){
      mail.destroyRecord();
    },
    toogleRead:function(mail){
      mail.set('read',!mail.get("read"));
      mail.save().then(null,this.ajaxError.bind(this))
    }
  }
});
