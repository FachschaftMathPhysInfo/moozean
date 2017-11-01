import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  actions:{
    searchTyps:function(name){
      return this.get("store").query('typ', {filter:{ name: name}});
    }
  }
});
