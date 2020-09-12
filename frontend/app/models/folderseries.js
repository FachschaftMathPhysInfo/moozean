import Model, { hasMany, attr } from '@ember-data/model';

export default Model.extend({
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
