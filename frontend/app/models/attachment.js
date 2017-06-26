import DS from 'ember-data';
import Ember from 'ember';
const { attr, belongsTo } = DS;
export default DS.Model.extend({
  attachment: attr('string'),
  contentType:attr('string'),
  inmail: belongsTo('inmail'),
  name: attr('string'),
  pdf:Ember.computed('attachment', function() {
    // body
    return "data:application/pdf;base64,"+this.get('attachment');
  }),
});
