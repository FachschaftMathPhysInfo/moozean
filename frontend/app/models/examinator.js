import Model, { hasMany, attr } from '@ember-data/model';
export default Model.extend({
	givenname:attr('string'),
	surname:attr('string'),
	title:attr('string'),
	reports: hasMany('report')
});
