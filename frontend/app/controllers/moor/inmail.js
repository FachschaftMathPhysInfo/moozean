import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    deleteInmail:function(mail){
      mail.destroyRecord();
    },
    toogleRead:function(mail){
      mail.set('read',!mail.get("read"));
      mail.save().then(null)
    },
    addStudent:function(){
      var store = this.get('store');
      this.set('newstudent',store.createRecord('student'));
      this.set("showCreate",true);
    }
  }
});
