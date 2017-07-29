import DS from 'ember-data';
const { attr, hasMany } = DS;
export default DS.Model.extend({
	givenname:attr('string'),
	surname:attr('string'),
	title:attr('string'),
	reports: hasMany('report')
});
