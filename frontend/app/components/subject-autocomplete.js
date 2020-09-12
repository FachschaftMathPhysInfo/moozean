import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  actions:{
    searchSubjects:function(name){
      return this.store.query('subject', {filter:{ name: name}});
    }
  }
});
