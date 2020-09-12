import Model, { hasMany, attr } from '@ember-data/model';
export default Model.extend({
  name:attr('string'),
  reports:hasMany('report')
});
