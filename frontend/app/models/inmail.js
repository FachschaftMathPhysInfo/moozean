import DS from 'ember-data';
import Referencable from './referencable';
const { attr, hasMany } = DS;
export default Referencable.extend({
  subject: attr('string'),
  fromname:attr('string'),
  fromaddress: attr('string'),
  createdAt:attr('date'),
  body: attr('string'),
  uid: attr('string'),
  attachments: hasMany('attachment',{async: true}),
  read:attr('boolean')
});
