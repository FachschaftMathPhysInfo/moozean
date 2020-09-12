import Model, { belongsTo, attr } from '@ember-data/model';
export default Model.extend({
  suffix:attr('string'),
  name:attr('string'),
  barcode:attr('string'),
  folderseries:belongsTo('folderseries'),
  obligationtoreport:attr('boolean')
});
