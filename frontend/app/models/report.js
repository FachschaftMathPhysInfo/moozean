import DS from 'ember-data';
const { attr,belongsTo } = DS;
export default DS.Model.extend({
  tex:attr('text'),
  examinationDate:attr('date'),
  subject:belongsTo('subject'),
  type:attr('type'),
  createdAt:attr('date'),
});



