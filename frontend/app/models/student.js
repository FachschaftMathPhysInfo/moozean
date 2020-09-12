import Model, { hasMany, attr } from '@ember-data/model';
export default Model.extend({
  name:attr('string'),
  uniid:attr('string'),
  matriculationnumber:attr('string'),
  refund:attr('boolean'),
  report:attr('boolean'),
  comment:attr('string'),
  lents:hasMany('lent'),
});
