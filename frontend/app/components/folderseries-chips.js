import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeFolderseries:function(folderseries){
      this.get('content').removeObject(folderseries);
    },
    addFolderseries: function(folderseries){
      this.get('content').pushObject(folderseries);
    }
  }
});
