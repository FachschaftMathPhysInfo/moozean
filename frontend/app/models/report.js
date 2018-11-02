import DS from 'ember-data';

const { attr,belongsTo, hasMany } = DS;
export default DS.Model.extend({
  examinationAt:attr('date',{
    defaultValue() { return new Date(); }
  }),
  subject:belongsTo('subject'),
  typ:belongsTo('typ'),
  createdAt:attr('date'),
  examinators:hasMany('examinator'),
  moduls:hasMany('modul'),
  folderseries:hasMany('folderseries'),
  picture:attr('string'),
  texAvailable:attr('boolean'),
  pdf:attr('string'),
  tex:attr('string')
});
