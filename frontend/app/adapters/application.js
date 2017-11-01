import { underscore } from '@ember/string';
import { singularize, pluralize } from 'ember-inflector';
import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';


export default JSONAPIAdapter.extend({

  pathForType(type) {
    return pluralize(underscore(type));
  }

});
