import Ember from 'ember';

export default Ember.Component.extend({
  store:Ember.inject.service(),
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
