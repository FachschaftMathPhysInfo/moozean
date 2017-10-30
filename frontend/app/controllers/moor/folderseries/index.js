import Ember from 'ember';

export default Ember.Controller.extend({
  noneditable:true,
  thisfolder:{},
  page: 1,
  resultsLength:Ember.computed('meta.record-count',function(){
    return this.get("meta.record-count");
  }),
  pages: Ember.computed('meta.page-count', function() {
    let e = Ember.A();
    console.log(this.get("meta.page-count"));
    for (let i = 1; i <= this.get("meta.page-count"); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  limitOptions: Ember.A([5, 10, 15]),
  limit:5,
  paginatedResults: Ember.computed('page', 'limit','model.folders.[]', function() {
    let result= this.store.query("folder", {
      filter:{
        folderseries:this.get("model.id")
      },
      page: {
        number: this.get('page'),
        size: this.get("limit")
      }
    });
    result.then((data) => {
      this.set("meta", data.get("meta"));
    })
    return result;
  }),
  actions:{
    toggleEditable: function(){
      this.set('noneditable',!this.get('noneditable'));
    },
    saveFolderseries:function(){
      this.get("model").save().then(null,this.ajaxError.bind(this))
    },
    deleteFolderseries:function(){
      this.get("model").destroyRecord();
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
        this.get('thisfolder').save().then(null,this.ajaxError.bind(this))
      }
      else {
        this.get('thisfolder').rollback();
      }
      this.set('showCreateFolderDialog',false);
      this.set('showEditFolderDialog',false);
      this.set('thisfolder',{});
    },
    incrementPage: function() {
      let page = this.get('page');
      let max = this.get('pages').reduce((prev, curr) => curr > prev
        ? curr
        : prev, 0);
      if (page < max) {
        this.set('page', page + 1);
      }
    },
    decrementPage: function() {
      let page = this.get('page');
      if (page > 0) {
        this.set('page', page - 1);
      }
    }
  }
});
