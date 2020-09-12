import { A } from '@ember/array';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import paginatedResult from "ember-ozean/mixins/paginated-result";
export default Controller.extend(paginatedResult,{
  init() {
    this._super(...arguments);
    
    this.thisfolder = this.thisfolder || {};
  },
  noneditable:true,
  page: 1,
  resultsLength:computed('meta.record-count',function(){
    return this.get("meta.record-count");
  }),
  limitOptions: A([5, 10, 15]),
  limit:5,
  paginatedResults: computed('page', 'limit','model.folders.[]', function() {
    let result= this.store.query("folder", {
      filter:{
        folderseries:this.get("model.id")
      },
      page: {
        number: this.page,
        size: this.limit
      }
    });
    result.then((data) => {
      this.set("meta", data.get("meta"));
    })
    return result;
  }),
  actions:{
    toggleEditable: function(){
      this.set('noneditable',!this.noneditable);
    },
    saveFolderseries:function(){
      this.model.save().then(null)
    },
    deleteFolderseries:function(){
      this.model.destroyRecord();
    },
    addFolder:function(){
      this.set('thisfolder',this.store.createRecord('folder',{folderseries:this.model,suffix:''}));
      this.set("showCreateFolderDialog",true);
    },
    editFolder:function(folder){
      this.set('thisfolder',folder);
      this.set("showCreateFolderDialog",true);
    },
    closeDeleteFolderDialog:function(option){
      if(option=="löschen"){
        this.thisfolder.destroyRecord();
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
        this.thisfolder.save().then(null)
      }
      else {
        this.thisfolder.rollback();
      }
      this.set('showCreateFolderDialog',false);
      this.set('showEditFolderDialog',false);
      this.set('thisfolder',{});
    }
  }
});
