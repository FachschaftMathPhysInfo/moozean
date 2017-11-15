import Controller from '@ember/controller';

export default Controller.extend({
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
    addStudent:function(){
      var store = this.get('store');
      this.set('newstudent',store.createRecord('student'));
      this.set("showCreate",true);
    },
    closeDialog: function(option) {
      var store = this.get('store');
      if (option == "ok") {
        let foo = function(_this) {
          return function() {
            _this.set('student', _this.get('newstudent'));
            _this.set('newstudent', store.createRecord('student'));
            _this.set("showDialog", false);
          }
        };
        this.get('newstudent').save().then(foo(this));
      }else{
        this.get('newstudent').destroyRecord();
      }
      this.set('showCreate', false);
    },
  }
});
