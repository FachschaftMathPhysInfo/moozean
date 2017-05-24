import Ember from 'ember';
import moment from 'moment';
export default Ember.Route.extend({
  beforeModel() {
    // sets the application locale to Spanish
    moment.locale('de');
  }
});
