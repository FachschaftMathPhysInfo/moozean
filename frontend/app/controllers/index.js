import Ember from 'ember';
export default Ember.Controller.extend({
  actions:{
    reload_lents: function(){
      this.set('model.lents',this.store.findAll('lent').slice());
      this.set('model.lents', this.store.findAll('lent'));
      console.log(this.get('model.lents'));

    },
    hole_ordner: function(){
      return this.get('model.folders');
    }
  }
  });
