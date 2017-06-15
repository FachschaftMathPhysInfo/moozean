import DS from 'ember-data';
const {belongsTo,attr}=DS;

export default DS.Model.extend({
  report:belongsTo('report'),
  times:attr('number')
});
