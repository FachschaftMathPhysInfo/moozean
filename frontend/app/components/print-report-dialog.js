import Component from '@ember/component';

export default Component.extend({
  actions: {
    exitDialog: function (option) {
      if (option) {
        this.get('report.examinators').filter(item => {
          return item.selected
        }).forEach(exm => {
          this.get('report.folderseries').filter(item => {
            return item.selected
          }).forEach(fs => {
            let s = prompt("UniId des Studis?");
            while (s == "" || s == null || s.length != 5) {
              s = prompt("Ich sagte Uniid!");
            }
            let po = this.store.createRecord('printout', {
              report: this.get('report'),
              times: 1,
              examinator: exm,
              folderseries: fs,
              uniid: s
            });
            po.save().then(null);
          });
        });
      }
      this.sendAction('closeDialog');
    }
  }
});
