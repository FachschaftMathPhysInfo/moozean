import Ember from 'ember';

export default Ember.Component.extend({
  store:Ember.inject.service(),
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
