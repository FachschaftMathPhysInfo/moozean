import DS from 'ember-data';
const { attr,belongsTo } = DS;

export default DS.Model.extend({
  //lentat:attr('date'), TODO: FIXMe
  report:belongsTo('report'),
  modul:belongsTo('modul')
});
