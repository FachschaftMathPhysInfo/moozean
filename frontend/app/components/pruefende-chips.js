import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store:service(),
  actions: {
    removeExaminator:function(examinator){
      this.get('content').removeObject(examinator);
    },
    addExaminator: function(examinator){
      this.get('content').pushObject(examinator);
    },
    search: function(name){
      return this.get("store").query('examinator',{filter:{name:name}});
    }
  }
});
