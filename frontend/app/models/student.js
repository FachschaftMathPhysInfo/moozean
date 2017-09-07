import DS from 'ember-data';
const { attr, hasMany } = DS;
export default DS.Model.extend({
  name:attr('string'),
  uniid:attr('string'),
  matriculationnumber:attr('string'),
  refund:attr('boolean'),
  report:attr('boolean'),
  comment:attr('string'),
  lents:hasMany('lent'),
});
