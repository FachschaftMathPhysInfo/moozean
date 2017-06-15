import Ember from 'ember';

export function reportInSelection([rep, select]/*, hash*/) {
  let a=select.filter(function(item){return item.get('report.id')==rep.get('id')});
  return (a.length>0);
}
export default Ember.Helper.helper(reportInSelection);
