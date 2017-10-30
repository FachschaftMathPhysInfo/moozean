import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions:{
    searchTyps:function(name){
      return this.get("store").query('typ', {filter:{ name: name}});
    }
  }
});
