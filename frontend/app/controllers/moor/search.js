import { computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import moment from 'moment';
export default Controller.extend({
  limitOptions: A([5, 10, 15]),
  limit: 5,
  pages: computed('meta.page-count', function() {
    let e = A();
    console.log(this.get("meta.page-count"));
    for (let i = 1; i <=this.get("meta.page-count"); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  page: 1,
  examinatora: A(),
  modula: A(),
  folderseriesa: A(),
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
  resultsLength:computed('meta.record-count', function() {
    return this.get("meta.record-count");
  }),
  results: computed('examinatora.[]', 'modula.[]', 'folderseriesa.[]', 'subject', 'typ','page','limit', function() {
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
      },
      page: {
        size: this.get("limit"),
        number:this.get("page")
      }
    });
    ergebnis.then((data) => {
      console.log(data);
      this.set("meta",data.meta);
      this.set("loading", false);
    });
    return ergebnis;
  }),
  filteredResults: computed('results.[]', 'beginExamAt', 'endExamAt', function() {
    if ((this.get("beginExamAt") == null) || (this.get("endExamAt") == null)) {
      return this.get('results');
    }
    let results = this.get('results').filter((item) => {
      return moment(item.get("examinationAt")).isBefore(this.get("endExamAt")) && this.get("beginExamAt").isBefore(moment(item.get("examinationAt")));
    });
    return results;
  }),
  minDate: computed('results.[]', function() {
    let min = moment();
    this.get('results').forEach((item) => {
      if (moment(item.get('examinationAt')).isBefore(min)) {
        min = moment(item.get('examinationAt'));
      }
    });
    return min;
  }),
  maxDate: computed('results.[]', function() {
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
      console.log(report);
      let exam = report.get("examinators").toArray()[0];
      let folds=report.get("folderseries").toArray()[0];
      console.log(exam);
      console.log(folds);
      let printout = this.store.createRecord('printout', {
        report: report,
        times: times,
        examinator:exam,
        folderseries: folds
      });
      console.log(printout);
      printout.save().then(null)
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
      });

    }
    else {
      report.rollback();
    }
    this.set('reporttoedit',null);
    this.set('editReport',false);
    }
  }
});
