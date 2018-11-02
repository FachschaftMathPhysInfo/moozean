import {
  hash
} from 'rsvp';
import { later } from '@ember/runloop';
import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return hash({
      folders: this.store.findAll('folder'),
      lents: this.store.findAll('lent')
    });
  },
  afterModel() {
    //this.renew();
  },
  renew: function() {
    var _this = this;
    later(function() {
      _this.refresh();
      _this.renew();
    }, 30000);
  }
});
