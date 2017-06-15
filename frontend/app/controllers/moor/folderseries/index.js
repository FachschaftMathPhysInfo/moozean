import Ember from 'ember';

export default Ember.Controller.extend({
  newfolder:{},
  actions:{
    addFolder:function(){
      this.set('newfolder',this.store.createRecord('folder',{folderseries:this.get('model'),suffix:''}));
      this.set("showCreateFolderDialog",true);
    },
    editFolder:function(folder){
      this.set('newfolder',folder);
      this.set("showEditFolderDialog",true);
    },
    deleteFolder:function(folder){
      folder.destroyRecord();
    },
    closeFolderDialog:function(option){
      if(option=="ok"){
        this.get('newfolder').save();
      }
      this.set('showCreateFolderDialog',false);
      this.set('showEditFolderDialog',false);
    }
  }
});
