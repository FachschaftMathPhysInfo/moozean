import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeExaminator:function(examinator){
      this.get('content').removeObject(examinator);
    },
    addExaminator: function(examinator){
      this.get('content').pushObject(examinator);
    }
  }
});
