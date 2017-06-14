import DS from 'ember-data';
import Referencable from './referencable';
const { attr,belongsTo } = DS;

export default DS.Model.extend({
  name:attr('string'),
  obligationtoreport:attr('boolean'),
  description:attr('type'),
  folder:hasMany('folder'),
});



