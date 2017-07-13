import Ember from 'ember';
export default Ember.Controller.extend({
  actions:{
    reload_lents: function(){
      this.get('model.lents').forEach((item)=>{
        item.reload().catch((reason)=>{
          item.unloadRecord();
        });
      });
    },
    hole_ordner: function(){
      return this.get('model.folders');
    }
  }
  });
