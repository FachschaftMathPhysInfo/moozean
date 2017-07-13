import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    undoReturn(returned){
      let lent=this.store.createRecord('lent',{student:returned.get('student'),folder:returned.get('folder')});
      lent.save().then(null,this.ajaxError.bind(this))
      returned.destroyRecord();
    }
  }
});
