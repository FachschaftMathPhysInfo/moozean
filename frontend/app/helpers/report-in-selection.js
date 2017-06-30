import Ember from 'ember';

export function reportInSelection([select,rep]/*, hash*/) {
  //console.log(select);
  //console.log(rep);
  let a=select.filter(function(item){return item.get('report.id')==rep.get('id')});
  return (a.length>0);
}
export default Ember.Helper.helper(reportInSelection);
