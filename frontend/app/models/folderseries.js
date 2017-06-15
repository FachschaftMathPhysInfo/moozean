import DS from 'ember-data';
const { attr,hasMany } = DS;

export default DS.Model.extend({
  name:attr('string'),
  obligationtoreport:attr('boolean'),
  description:attr('string'),
  folders:hasMany('folder'),
  reports: hasMany('report'),
  subjects: hasMany('subject'),
  typs: hasMany('typ'),
  examinators: hasMany('examinator'),
  moduls: hasMany('modul')
});
