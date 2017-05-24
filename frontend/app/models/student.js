import DS from 'ember-data';
const { attr } = DS;
export default DS.Model.extend({
  name:attr('string'),
  uniid:attr('string'),
  matriculationnumber:attr('string'),
  refund:attr('boolean'),
  report:attr('boolean'),
  comment:attr('string')
});
