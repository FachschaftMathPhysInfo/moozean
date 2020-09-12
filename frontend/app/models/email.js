import Model, { belongsTo, attr } from '@ember-data/model';
export default Model.extend({
  address: attr('string'),
  subject: attr('string'),
  body: attr('string'),
  createdAt:attr('date'),
  referencable:belongsTo('referencable',{polymorphic:true})
});
