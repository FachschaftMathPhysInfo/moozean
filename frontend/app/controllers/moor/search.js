import Ember from 'ember';
import moment from 'moment';
export default Ember.Controller.extend({
  limitOptions: Ember.A([5, 10, 15]),
  limit: 5,
  pages: Ember.computed('limit', 'filteredResults.[]', function() {
    let e = Ember.A();
    for (let i = 1; i < Math.ceil(this.get("filteredResults.length") / this.get("limit")); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  page: 1,
  examinatora: Ember.A(),
  modula: Ember.A(),
  folderseriesa: Ember.A(),
  beginExamAt: "date",
  endExamAt: "date",
  queryParams: [
    'examinatora',
    'modula',
    'folderseriesa',
    'subject',
    'typ',
    'beginExamAt',
    'endExamAt'
  ],
  results: Ember.computed('examinatora.[]', 'modula.[]', 'folderseriesa.[]', 'subject', 'typ', function() {
    this.set("loading", true);
    let moduls = [];
    let examinators = [];
    let folderseries = [];
    if (this.get("folderseriesa") != null) {
      this.get("folderseriesa").forEach((item) => {
        folderseries.pushObject(item.get("id"));
      });
    }
    if (this.get("examinatora") != null) {
      this.get("examinatora").forEach((item) => {
        examinators.pushObject(item.get("id"));
      });
    }
    if (this.get("modula") != null) {
      this.get("modula").forEach((item) => {
        moduls.pushObject(item.get("id"));
      });
    }
    let ergebnis = this.get('store').query('report', {
      filter: {
        subject: this.get('subject.id'),
        typ: this.get('typ.id'),
        moduls: moduls,
        examinators: examinators,
        folderseries: folderseries
      }
    });
    ergebnis.then(() => {
      this.set("loading", false);
    },this.ajaxError.bind(this));
    return ergebnis;
  }),
  filteredResults: Ember.computed('results.[]', 'beginExamAt', 'endExamAt', function() {
    if ((this.get("beginExamAt") == null) || (this.get("endExamAt") == null)) {
      return this.get('results');
    }
    let results = this.get('results').filter((item) => {
      return moment(item.get("examinationAt")).isBefore(this.get("endExamAt")) && this.get("beginExamAt").isBefore(moment(item.get("examinationAt")));
    });
    return results;
  }),
  paginatedResults: Ember.computed('filteredResults.[]', 'page', 'limit', function() {
    let ind = (this.get('page') - 1) * this.get('limit');
    return Ember.A(this.get("filteredResults").toArray().slice(ind, ind + this.get('limit')));
  }),
  minDate: Ember.computed('results.[]', function() {
    let min = moment();
    this.get('results').forEach((item) => {
      if (moment(item.get('examinationAt')).isBefore(min)) {
        min = moment(item.get('examinationAt'));
      }
    });
    return min;
  }),
  maxDate: Ember.computed('results.[]', function() {
    let max = moment(new Date(1900));
    this.get('results').forEach((item) => {
      if (max.isBefore(moment(item.get('examinationAt')))) {
        max = moment(item.get('examinationAt'));
      }
    });
    return max;
  }),
  reporttoedit: null,
  editReport: false,
  actions: {
    printReport: function(report, times) {
      let printout = this.store.createRecord('printout', {
        report: report,
        times: times
      });
      printout.save().then(null,this.ajaxError.bind(this))
    },
    decrementPage() {
      let page = this.get('page');
      if (page > 0) {
        this.set('page', page - 1);
      }
    },
    incrementPage() {
      let page = this.get('page');
      let max = this.get('pages').reduce((prev, curr) => curr > prev
        ? curr
        : prev, 0);
      if (page < max) {
        this.set('page', page + 1);
      }
    },
    editReport:function(report){
      this.set('reporttoedit',report);
      this.set('editReport',true);
    },
    deleteReport:function(report){
      report.destroyRecord();
    },
    closeReportDialog:function(option, report){
      if(option=="ok"){
      report.save().then(()=>{
        alert("Erfolgreich gespeichert!");
      },this.ajaxError.bind(this));

    }
    else {
      report.rollback();
    }
    this.set('reporttoedit',null);
    this.set('editReport',false);
    }
  }
});
