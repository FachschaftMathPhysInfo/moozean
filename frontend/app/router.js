import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('moor', function() {
    this.route('folderseries',{ path: '/folderseries/:id' }, function() {
      this.route('print');
      this.route('new');
    });
    this.route('management', function() {
      this.route('examinators');
    });
    this.route('search');
  });
  this.route('recentlyreturned');
});

export default Router;
