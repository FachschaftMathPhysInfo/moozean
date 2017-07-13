import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import AjaxErrorHandling from "./mixins/ajaxerror-handling";

Ember.Route.reopen(AjaxErrorHandling);
Ember.Controller.reopen(AjaxErrorHandling);

Ember.Component.reopen({
  actions: {
    // Passing ajaxError per default
    ajaxError: function(error) {
      this.sendAction('ajaxError', error);
    }
  }
});
let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
