import DS from 'ember-data';
const {
  belongsTo
} = DS;
export default DS.Model.extend({
  times: DS.attr('number'),
  folderseries: belongsTo('folderseries'),
  uniid: DS.attr('string')
});
