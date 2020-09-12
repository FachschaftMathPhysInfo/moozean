import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  actions: {
    removeObj:function(folderseries){
      this.content.removeObject(folderseries);
    },
    addObj: function(folderseries){
      this.content.pushObject(folderseries);
    },
    search:function(name){
      return this.store.query(this.modelName,{filter:{name:name}});
    }
  }
});