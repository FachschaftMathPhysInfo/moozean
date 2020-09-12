import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  report:belongsTo('report'),
  examinator:belongsTo('examinator'),
  folderseries:belongsTo('folderseries'),
  times:attr('number')
});
