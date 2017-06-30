import Ember from 'ember';

export function contains([pruefauswahl,rep,exm]) {
  let a = pruefauswahl.filter(function(item) {
      return (item.report.get('id') == rep.get('id')) && (item.examinator.get('id') == exm.get('id'))
  });
  return a.length>0;
}

export default Ember.Helper.helper(contains);
