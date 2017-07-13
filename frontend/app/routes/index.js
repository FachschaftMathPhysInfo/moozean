import Ember from 'ember';

export default Ember.Route.extend({
  model:function(){
    return Ember.RSVP.hash({folders:this.store.findAll('folder').catch(this.ajaxError.bind(this)),lents:this.store.findAll('lent').catch(this.ajaxError.bind(this))});
  }
  
});
