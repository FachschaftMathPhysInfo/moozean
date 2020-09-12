import Model, { hasMany, attr } from '@ember-data/model';
export default Model.extend({
  name:attr('string'),
  abbreviation:attr('string'),
  linkModulhandbuch:attr('string'),
  reports:hasMany('report')
});
