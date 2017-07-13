import Ember from 'ember';

export default Ember.Route.extend({
  model:function(){
    return Ember.RSVP.hash({subjects:this.store.findAll('subject').catch(this.ajaxError.bind(this)),
    typs:this.store.findAll('typ').catch(this.ajaxError.bind(this)),
    moduls:this.store.findAll('modul').catch(this.ajaxError.bind(this))});
  }
});
