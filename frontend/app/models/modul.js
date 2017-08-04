import DS from 'ember-data';
const { attr, hasMany } = DS;
export default DS.Model.extend({
  name:attr('string'),
  abbreviation:attr('string'),
  linkModulhandbuch:attr('string'),
  reports:hasMany('report')
});
