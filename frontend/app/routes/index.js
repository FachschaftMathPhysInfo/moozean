import Ember from 'ember';

export default Ember.Route.extend({
  model:function(){
    return Ember.RSVP.hash({folders:this.store.findAll('folder'),lents:this.store.findAll('lent')});
  }
  
});
