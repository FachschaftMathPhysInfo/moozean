import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  titlestudent: "Studierendes eintragen",
  newstudent: {},
  showCreate:false,
  actions:{
    deleteInmail:function(mail){
      mail.destroyRecord();
    },
    toogleRead:function(mail){
      mail.set('read',!mail.get("read"));
      mail.save().then(null,this.ajaxError.bind(this))
    },
    closeDialog: function(option) {
      var store = this.get('store');
      if (option == "ok") {
        let foo = function(_this) {
          return function() {
            _this.set('newstudent', store.createRecord('student'));
            _this.set("showCreate", false);
          }
        };
        if (this.get('newstudent').save != null)
          this.get('newstudent').save().then(foo(this), this.actions.ajaxError.bind(this))
        else this.get('newstudent').content.save().then(foo(this), this.actions.ajaxError.bind(this));
      }else{
        this.get('newstudent').destroyRecord();
        this.set('showCreate', false);
      }
    },
    addStudent: function() {
      var store = this.get('store');
      this.set('newstudent', store.createRecord('student'));
      this.set("showCreate", true);
    },
  }
});
