import DS from 'ember-data';
import Referencable from './referencable';
const { attr,belongsTo } = DS;
export default DS.Model.extend({
  name:attr('string'),
  content:attr('string'),
  obligationToReport:attr('boolean'),
  barcode:attr('string'),
  folderseries:belongsTo('folderseries'),
});
