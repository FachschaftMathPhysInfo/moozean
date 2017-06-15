import Ember from 'ember';
import moment from 'moment';
export default Ember.Route.extend({
  beforeModel() {
    // sets the application locale to Spanish
    moment.locale('de');
  },
  model:function(){
    return Ember.RSVP.hash({folderseries:this.store.findAll('folderseries')});
  }
});
