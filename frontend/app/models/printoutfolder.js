import Model, { belongsTo, attr } from '@ember-data/model';
export default Model.extend({
  times: attr('number'),
  folderseries: belongsTo('folderseries')
});
