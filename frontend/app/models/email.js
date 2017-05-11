import DS from 'ember-data';
const { attr, belongsTo } = DS;
export default DS.Model.extend({
  address: DS.attr('string'),
  subject: DS.attr('string'),
  body: DS.attr('string')
});
