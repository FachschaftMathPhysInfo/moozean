import DS from 'ember-data';
const {belongsTo,attr}=DS;

export default DS.Model.extend({
  report:belongsTo('report'),
  examinator:belongsTo('examinator'),
  folderseries:belongsTo('folderseries'),
  times:attr('number')
});
