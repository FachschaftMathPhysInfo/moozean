import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeModul:function(modul){
      this.get('content').removeObject(modul);
    },
    addModul: function(modul){
      this.get('content').pushObject(modul);
    }
  }
});
