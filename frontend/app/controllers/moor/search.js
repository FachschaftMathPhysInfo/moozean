import { computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import moment from 'moment';
export default Controller.extend({
  limitOptions: A([5, 10, 15]),
  limit: 5,
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
  results: computed('examinatora.[]', 'modula.[]', 'folderseriesa.[]', 'subject', 'typ','page','limit','beginExamAt','endExamAt', function() {
    //this.set("loading", true);
    let moduls = [];
    let examinators = [];
    let folderseries = [];
    var start=this.get('beginExamAt');
    var end=this.get('endExamAt');
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
        folderseries: folderseries,
        daterange: [start,end]
      },
      page: {
        size: this.get("limit"),
        number:this.get("page")
      }
    });

    // let oldest=this.get('store').query('report',
    // {filter: {
    //     subject: this.get('subject.id'),
    //     typ: this.get('typ.id'),
    //     moduls: moduls,
    //     examinators: examinators,
    //     folderseries: folderseries
    //   },
    //   page: {{size:1,number:1}},
    //    sort: "examination_at" });
    // let newest=this.get('store').query('report', {
    //   filter: {
    //     subject: this.get('subject.id'),
    //     typ: this.get('typ.id'),
    //     moduls: moduls,
    //     examinators: examinators,
    //     folderseries: folderseries
    //   }, page: {number:1,size:1}, sort: "-examination_at"
    // });
    // newest.then((item)=>{
    //   this.set("maxDate",moment(item.get('firstObject').get('examinationAt')));
    //   //this.set("endExamAt",moment(item.get('firstObject').get('examinationAt')));
    //   });
    //   let oldest=this.get('store').query('report', {
    //     filter: {
    //       subject: this.get('subject.id'),
    //       typ: this.get('typ.id'),
    //       moduls: moduls,
    //       examinators: examinators,
    //       folderseries: folderseries
    //     }, page: {number:1,size:1}, sort: "examination_at"
    //   });
    //   oldest.then((item)=>{
    //     this.set("minDate",moment(item.get('firstObject').get('examinationAt')));
    //     //this.set("beginExamAt",moment(item.get('firstObject').get('examinationAt')));
    //     });
      // oldest.then((item)=>{
      //   console.log(item);
      //   item.get("examinationAt").then((date)=>{
      //     this.set("minDate",moment(date));
      //   });
      // });
      // newest.then((item)=>{
      //   console.log(moment(item.get('examinationAt')));
      //   this.set("maxDate",moment(item.get('examinationAt')));
      // });
    ergebnis.then((data) => {
      this.set("meta",data.meta);
      //this.set("loading", false);
    });
    return ergebnis;
  }),
  // filteredResults: computed('results.[]', 'beginExamAt', 'endExamAt', function() {
  //   if ((this.get("beginExamAt") == null) || (this.get("endExamAt") == null)) {
  //     return this.get('results');
  //   }
  //   let results = this.get('results').filter((item) => {
  //   });
  //   return results;
  // }),
  // minDate: computed('results.[]', function() {
  //   let min = moment();
  //   this.get('results').forEach((item) => {
  //     if (moment(item.get('examinationAt')).isBefore(min)) {
  //       min = moment(item.get('examinationAt'));
  //     }
  //   });
  //   return min;
  // }),
  // maxDate: computed('results.[]', function() {
  //   let max = moment(new Date(1900));
  //   this.get('results').forEach((item) => {
  //     if (max.isBefore(moment(item.get('examinationAt')))) {
  //       max = moment(item.get('examinationAt'));
  //     }
  //   });
  //   return max;
  // }),
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
      console.log(report);
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
