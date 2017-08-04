import DS from 'ember-data';
const { attr,belongsTo } = DS;
export default DS.Model.extend({
  suffix:attr('string'),
  name:attr('string'),
  barcode:attr('string'),
  folderseries:belongsTo('folderseries'),
  obligationtoreport:attr('boolean')
});
