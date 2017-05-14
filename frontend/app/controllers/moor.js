import Ember from 'ember';

export default Ember.Controller.extend({
  leftSideBarOpen2:true,
  newfolder:{},
  actions:{
    addFolder:function(){
      this.set('newfolder',this.store.createRecord('folder'));
      this.set("showDialog",true);
    },
    closeDialog:function(option){
      if(option=="ok"){
        this.get('newfolder').save();
      }
      this.set('showDialog',false);
    }
  }
});
