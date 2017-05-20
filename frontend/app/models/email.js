import DS from 'ember-data';
const { attr, belongsTo } = DS;
export default DS.Model.extend({
  address: attr('string'),
  subject: attr('string'),
  body: attr('string'),
  referencable:belongsTo('referencable',{polymorphic:true})
});
