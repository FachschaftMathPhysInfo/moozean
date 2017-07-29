import DS from 'ember-data';
const { belongsTo } = DS;

export default DS.Model.extend({
  report:belongsTo('report'),
  examinator:belongsTo('examinator')
});
