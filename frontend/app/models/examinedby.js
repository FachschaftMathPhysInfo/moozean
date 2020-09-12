import Model, { belongsTo } from '@ember-data/model';

export default Model.extend({
  report:belongsTo('report'),
  examinator:belongsTo('examinator')
});
