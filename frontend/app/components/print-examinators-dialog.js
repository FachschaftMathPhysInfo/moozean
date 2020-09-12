import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { A } from '@ember/array';
import Component from '@ember/component';

export default Component.extend({
  pruefauswahl: A(),
  reportslistDidChange: on('init', observer('reportslist', function() {
    let pruefauswahl = this.pruefauswahl;
    pruefauswahl.clear();
      this.reportslist.forEach((item)=>{
        item.get('examinators').forEach((item2)=>{
          pruefauswahl.pushObject({
            report: item,
            examinator: item2
          });
        });
      });
  })),
  actions: {
    toggleSelect: function(rep, exm) {
      let a = this.pruefauswahl.filter(function(item) {
        return (item.report.get('id') == rep.get('id')) && (item.examinator.get('id') == exm.get('id'))
      });
      if (a.length > 0) {
        this.pruefauswahl.removeObject(a[0]);
      } else {
        this.pruefauswahl.pushObject({
          report: rep,
          examinator: exm
        });
      }
      this.set('pruefauswahl', this.pruefauswahl.slice());
    },
    exitDialog: function(option) {
      if (this.auswahl) {
        this.sendAction('closeDialogAuswahl', option);
      } else {
        this.sendAction('closeDialogDrucken', option);
      }
    }
  }
});
