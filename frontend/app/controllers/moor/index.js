import Ember from 'ember';

export default Ember.Controller.extend({
  leftSideBarOpen2:true,
  newfolder:{},
  actions:{
    addFolderseries:function(){
      this.set('newfolderseries',this.store.createRecord('folderseries'));
      this.set("showDialog",true);
    },
    deleteFolderSeries(folder){
      if(folder.get("name")==prompt("Wirklich Ordnerreihe zerstören? Bitte trage den Namen der Ordnerserie ein:")){
        folder.destroyRecord();
      }
    },
    closeDialog:function(option){
      if(option=="ok"){
        this.get('newfolderseries').save().then(null,this.ajaxError.bind(this))
      }
      this.set('showDialog',false);
    }
  }
});
