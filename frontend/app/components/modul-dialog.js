import Component from '@ember/component';

export default Component.extend({
  actions: {
    removeModul:function(modul){
      this.get('content').removeObject(modul);
    },
    addModul: function(modul){
      this.get('content').pushObject(modul);
    }
  }
});
