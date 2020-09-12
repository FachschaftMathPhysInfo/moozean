import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  lentat: attr('date'),
  createdAt:attr('date'),
  student: belongsTo('student'),
  folder: belongsTo('folder')
});
