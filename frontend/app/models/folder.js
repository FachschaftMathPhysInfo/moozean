import DS from 'ember-data';
import Ember from 'ember';
const { attr,belongsTo } = DS;
export default DS.Model.extend({
  suffix:attr('string'),
  name: Ember.computed('suffix', 'folderseries.name', function() {
    return `${this.get('folderseries.name')}${this.get('suffix')}`;
  }),
  barcode:attr('string'),
  folderseries:belongsTo('folderseries')
});
