import { belongsTo, attr } from '@ember-data/model';
import Referencable from './referencable';
export default Referencable.extend({
  //lentat:attr('date'), TODO: FIXMe
  student:belongsTo('student'),
  folder:belongsTo('folder'),
  createdAt:attr('date')
});
