import Controller from '@ember/controller';
import studentManagment from "ember-ozean/mixins/student-managment";

export default Controller.extend(studentManagment,{
  actions:{
    archiveMail:function(mail){
      mail.set("archived",true);
      mail.save().then(()=>{
        mail.unloadRecord();
        alert("Die Mail ist nun archiviert.\nSie ist jetzt noch für 182 Tage aus der Datenbank abrufbar.\nDann wird sie nicht mehr existieren.")
      });
    },
    deleteMail:function(mail){
      mail.destroyRecord();
    },
    toogleRead:function(mail){
      mail.set('read',!mail.get("read"));
      mail.save().then(null)
    },
    closeDialog: function(option) {
      var store = this.store;
      if (option == "ok") {
        let foo = function(_this) {
          return function() {
            _this.set('student', _this.get('newstudent'));
            _this.set('newstudent', store.createRecord('student'));
            _this.set("showDialog", false);
          }
        };
        this.newstudent.save().then(foo(this));
      }else{
        this.newstudent.destroyRecord();
      }
      this.set('showCreate', false);
    },
  }
});
