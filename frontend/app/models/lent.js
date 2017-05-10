import DS from 'ember-data';
const { attr, hasMany,belongsTo } = DS;
export default DS.Model.extend({
  //lentat:attr('date'), TODO: FIXMe
  student:belongsTo('student'),
  folder:belongsTo('folder'),
  createdAt:attr('date')
});
