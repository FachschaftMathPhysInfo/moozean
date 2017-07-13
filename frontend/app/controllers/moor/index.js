import Ember from 'ember';

export default Ember.Controller.extend({
  leftSideBarOpen2:true,
  newfolder:{},
  actions:{
    addFolder:function(){
      this.set('newfolder',this.store.createRecord('folder'));
      this.set("showDialog",true);
    },
    deleteFolderSeries(folder){
      if(folder.get("name")==prompt("Wirklich Ordnerreihe zerstören? Bitte trage den Namen der Ordnerserie ein:")){
        folder.destroyRecord();
      }
    },
    closeDialog:function(option){
      if(option=="ok"){
        this.get('newfolder').save().then(null,this.ajaxError.bind(this))
      }
      this.set('showDialog',false);
    }
  }
});
