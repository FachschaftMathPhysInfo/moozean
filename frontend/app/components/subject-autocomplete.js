import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions:{
    searchSubjects:function(name){
      return this.get("store").query('subject', {filter:{ name: name}});
    }
  }
});
