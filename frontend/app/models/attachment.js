import Model, { belongsTo, attr } from '@ember-data/model';
import { computed } from '@ember/object';
export default Model.extend({
  attachment: attr('string'),
  contentType:attr('string'),
  inmail: belongsTo('inmail'),
  name: attr('string'),
  pdf:computed('attachment', function() {
    // body
    return "data:application/pdf;base64,"+this.attachment;
  }),
});
