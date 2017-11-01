import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    undoReturn(returned){
      let lent=this.store.createRecord('lent',{student:returned.get('student'),folder:returned.get('folder')});
      lent.save().then(null)
      returned.destroyRecord();
    }
  }
});
