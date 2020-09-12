import Model, { belongsTo } from '@ember-data/model';

export default Model.extend({
  //lentat:attr('date'), TODO: FIXMe
  report:belongsTo('report'),
  modul:belongsTo('modul')
});
