import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    removeFolderseries:function(folderseries){
      this.get('content').removeObject(folderseries);
    },
    addFolderseries: function(folderseries){
      this.get('content').pushObject(folderseries);
    },
    search:function(name){
      return this.get("store").query('folderseries',{filter:{name:name}});
    }
  }
});
