import DS from 'ember-data';
const { attr } = DS;
export default DS.Model.extend({
	givenname:attr('string'),
	surname:attr('string'),
	title:attr('string')
});