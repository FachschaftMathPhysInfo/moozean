import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
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
