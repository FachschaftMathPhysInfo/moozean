import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import JSONAPIAdapter from 'ember-data/adapters/json-api';


export default JSONAPIAdapter.extend({
  namespace:"api",
  pathForType(type) {
    return pluralize(underscore(type));
  }

});
