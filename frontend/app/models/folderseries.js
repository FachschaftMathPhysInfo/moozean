import DS from 'ember-data';
const { attr,hasMany } = DS;

export default DS.Model.extend({
  name:attr('string'),
  obligationtoreport:attr('boolean'),
  description:attr('type'),
  folder:hasMany('folder'),
});



