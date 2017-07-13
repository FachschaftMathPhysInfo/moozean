import Ember from 'ember';

export default Ember.Route.extend({
  model:function(){
    return this.store.findAll('examinator').catch(this.ajaxError.bind(this));
  }
});
