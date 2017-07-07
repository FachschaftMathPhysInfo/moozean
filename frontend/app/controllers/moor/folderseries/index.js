import Ember from 'ember';

export default Ember.Controller.extend({
  thisfolder:{},
  actions:{
    saveFolderseries:function(){
      this.get("model").save();
    },
    addFolder:function(){
      this.set('thisfolder',this.store.createRecord('folder',{folderseries:this.get('model'),suffix:''}));
      this.set("showCreateFolderDialog",true);
    },
    editFolder:function(folder){
      this.set('thisfolder',folder);
      this.set("showCreateFolderDialog",true);
    },
    closeDeleteFolderDialog:function(option){
      if(option=="löschen"){
        this.get('thisfolder').destroyRecord();
      }
      this.set('thisfolder',{});
      this.set("showDeleteFolderDialog",false);
    },
    deleteFolder:function(folder){
      this.set('thisfolder',folder);
      this.set("showDeleteFolderDialog",true);
    },
    closeFolderDialog:function(option){
      if(option=="ok"){
        this.get('thisfolder').save();
      }
      this.set('showCreateFolderDialog',false);
      this.set('showEditFolderDialog',false);
      this.set('thisfolder',{});
    }
  }
});
