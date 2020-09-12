import { hasMany, attr } from '@ember-data/model';
import Referencable from './referencable';
export default Referencable.extend({
  subject: attr('string'),
  fromname:attr('string'),
  fromaddress: attr('string'),
  createdAt:attr('date'),
  body: attr('string'),
  uid: attr('string'),
  attachments: hasMany('attachment',{async: true}),
  read:attr('boolean'),
  archived:attr('boolean')
});
