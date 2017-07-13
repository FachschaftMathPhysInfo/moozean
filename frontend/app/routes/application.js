import Ember from 'ember';
import moment from 'moment';
export default Ember.Route.extend({
  beforeModel() {
    // sets the application locale to Spanish
    moment.locale('de');
  },
  model:function(){
    return Ember.RSVP.hash({folderseries:this.store.findAll('folderseries').catch(this.ajaxError.bind(this))});
  },
  actions: {
  error: function(error) {
    this.send('ajaxError', error);
  },

  ajaxError: function(error) {
    this.ajaxError(error);
  }
}
});
