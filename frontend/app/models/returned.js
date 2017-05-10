import DS from 'ember-data';

export default DS.Model.extend({
  lentat: DS.attr('date'),
  student: DS.belongsTo('student'),
  folder: DS.belongsTo('folder')
});
