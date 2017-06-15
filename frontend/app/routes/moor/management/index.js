import Ember from 'ember';

export default Ember.Route.extend({
  model:function(){
    return Ember.RSVP.hash({subjects:this.store.findAll('subject'),
    typs:this.store.findAll('typ'),
    moduls:this.store.findAll('modul')});
  }
});
