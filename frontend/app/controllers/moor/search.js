import { computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import moment from 'moment';
export default Controller.extend({
  limitOptions: A([10,20,30]),
  limit: 10,
  minDate:moment(new Date(0)),
  beginExamAt:moment(new Date(0)),
  maxDate:moment(new Date()),
  endExamAt:moment(new Date()),
  pages: computed('meta.page-count', function() {
    let e = A();
    for (let i = 1; i <=this.get("meta.page-count"); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  page: 1,
  examinatora: A(),
  modula: A(),
  folderseriesa: A(),
  resultsLength:computed('meta.record-count', function() {
    return this.get("meta.record-count");
  }),
  queryReports: function(moduls,examinators,folderseries,start,end){
    let dr =[start,end];
    if(start==null) dr=null;
    let ergebnis = this.get('store').query('report', {
      filter: {
        subject: this.get('subject.id'),
        typ: this.get('typ.id'),
        moduls: moduls,
        examinators: examinators,
        folderseries: folderseries,
        daterange: dr,
      },
      page: {
        size: this.get("limit"),
        number:this.get("page")
      }
    });
    ergebnis.then((data) => {
      this.set("meta",data.meta);
    });
    return ergebnis;
  },
  results: computed('examinatora.[]', 'modula.[]', 'folderseriesa.[]', 'subject', 'typ','page','limit','beginExamAt','endExamAt', function() {
    //this.set("loading", true);
    let moduls = [];
    let examinators = [];
    let folderseries = [];
    var start=this.get('beginExamAt').toDate();
    var end=this.get('endExamAt').toDate();
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
    if(!this.get("setRangeDate")) start=null;
    let ergebnis =this.queryReports(moduls,examinators,folderseries,start,end);
    return ergebnis;
  }),
  reporttoedit: null,
  editReport: false,
  actions: {
    printReport: function(report, times) {
      let exam = report.get("examinators").toArray()[0];
      let folds=report.get("folderseries").toArray()[0];
      let printout = this.store.createRecord('printout', {
        report: report,
        times: times,
        examinator:exam,
        folderseries: folds
      });
      printout.save().then(null)
    },
    editReport:function(report){
      this.set('reporttoedit',report);
      this.set('editReport',true);
    },
    deleteReport:function(report){
      this.set("reporttoedit",report);
      this.set("deleteReport",true);
    },
    closeDeleteDialog:function(report,option){
      if(option){
        report.destroyRecord();
      }
      this.set("deleteReport",false);
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
