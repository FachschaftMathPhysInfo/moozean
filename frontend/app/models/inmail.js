import DS from 'ember-data';
const { attr, hasMany } = DS;
export default DS.Model.extend({
  subject: attr('string'),
  fromname:attr('string'),
  fromaddress: attr('string'),
  body: attr('string'),
  uid: attr('string'),
  attachments: hasMany('attachment',{async: true}),
  read:attr('boolean')
});
