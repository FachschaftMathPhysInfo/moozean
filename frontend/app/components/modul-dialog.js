import Component from '@ember/component';

export default Component.extend({
  actions: {
    removeModul:function(modul){
      this.content.removeObject(modul);
    },
    addModul: function(modul){
      this.content.pushObject(modul);
    }
  }
});
