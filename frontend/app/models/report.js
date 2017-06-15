import DS from 'ember-data';
const { attr,belongsTo, hasMany } = DS;
export default DS.Model.extend({
  examinationDate:attr('date'),
  subject:belongsTo('subject'),
  typ:belongsTo('typ'),
  createdAt:attr('date'),
  examinators:hasMany('examinator'),
  moduls:hasMany('modul'),
  picture:attr('string'),
  texAvailable:attr('boolean')
});
