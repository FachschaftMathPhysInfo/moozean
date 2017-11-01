import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    deleteInmail:function(mail){
      mail.destroyRecord();
    },
    toogleRead:function(mail){
      mail.set('read',!mail.get("read"));
      mail.save().then(null)
    }
  }
});
