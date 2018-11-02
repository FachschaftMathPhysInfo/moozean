import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  actions: {
    removeObj:function(folderseries){
      this.get('content').removeObject(folderseries);
    },
    addObj: function(folderseries){
      this.get('content').pushObject(folderseries);
    },
    search:function(name){
      return this.get("store").query(this.get('modelName'),{filter:{name:name}});
    }
  }
});