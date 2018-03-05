import DS from 'ember-data';
const {belongsTo,attr}=DS;
export default DS.Model.extend({
  times: DS.attr('number'),
  folderseries: belongsTo('folderseries')
});
