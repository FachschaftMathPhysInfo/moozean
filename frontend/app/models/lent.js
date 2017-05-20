import DS from 'ember-data';
import Referencable from './referencable';
const { attr,belongsTo } = DS;
export default Referencable.extend({
  //lentat:attr('date'), TODO: FIXMe
  student:belongsTo('student'),
  folder:belongsTo('folder'),
  createdAt:attr('date')
});
