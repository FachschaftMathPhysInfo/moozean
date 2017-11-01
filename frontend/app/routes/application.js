import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import moment from 'moment';
export default Route.extend({
  beforeModel() {
    // sets the application locale to Spanish
    moment.locale('de');
  },
  model:function(){
    return hash({folderseries:this.store.findAll('folderseries')});
  },
  actions: {
}
});
