import Ember from 'ember';

export function isActive([routeName, activeRoute]/*, hash*/) {
     return activeRoute === routeName;
}
export default Ember.Helper.helper(isActive);
