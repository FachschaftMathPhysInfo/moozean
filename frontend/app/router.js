import EmberRouter from '@ember/routing/router';
import config from 'ember-ozean/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('moor', function() {
    this.route('folderseries',{ path: '/folderseries/:id' }, function() {
      this.route('print');
      this.route('new');
    });
    this.route('management', function() {
      this.route('examinators');
      this.route('students');
    });
    this.route('search');
    this.route('report',function(){
      this.route('new');
      this.route('view',{path:'view/:id'}, function() {});
    });
    this.route('inmail', function() {
      this.route('view', { path: '/view/:id' }, function() {});
    });
  });
  this.route('recentlyreturned');

  this.route('management', function() {});
});
