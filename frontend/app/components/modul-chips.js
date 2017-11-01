import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store:service(),
  actions: {
    removeModul:function(modul){
      this.get('content').removeObject(modul);
    },
    addModul: function(modul){
      this.get('content').pushObject(modul);
    },
    searchModuls: function(name){
      return this.get("store").query('modul',{filter:{name:name}});
    }
  }
});
