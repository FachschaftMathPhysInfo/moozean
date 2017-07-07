import Ember from 'ember';

export default Ember.Component.extend({
  pruefauswahl: Ember.A(),
  reportslistDidChange: Ember.on('init', Ember.observer('reportslist', function() {
    let pruefauswahl = this.get('pruefauswahl');
    pruefauswahl.clear();
      this.get('reportslist').forEach((item)=>{
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
      let a = this.get('pruefauswahl').filter(function(item) {
        return (item.report.get('id') == rep.get('id')) && (item.examinator.get('id') == exm.get('id'))
      });
      if (a.length > 0) {
        this.get('pruefauswahl').removeObject(a[0]);
      } else {
        this.get('pruefauswahl').pushObject({
          report: rep,
          examinator: exm
        });
      }
      this.set('pruefauswahl', this.get('pruefauswahl').slice());
    },
    exitDialog: function(option) {
      if (this.get('auswahl')) {
        this.sendAction('closeDialogAuswahl', option);
      } else {
        this.sendAction('closeDialogDrucken', option);
      }
    }
  }
});
