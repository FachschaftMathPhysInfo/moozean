import { computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import moment from 'moment';
export default Controller.extend({
  limitOptions: A([10,20,30]),
  limit: 10,
  minDate:moment(new Date(1984)),
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
  student:null,
  examinatora: A(),
  modula: A(),
  folderseriesa: A(),
  resultsLength:computed('meta.record-count', function() {
    return this.get("meta.record-count");
  }),
  queryReports: function(moduls,examinators,folderseries,start,end){
    let dr =[start,end];
    if(start==null) dr=null;
    let ergebnis = this.store.query('report', {
      filter: {
        subject: this.get('subject.id'),
        typ: this.get('typ.id'),
        moduls: moduls,
        examinators: examinators,
        folderseries: folderseries,
        daterange: dr,
      },
      page: {
        size: this.limit,
        number:this.page
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
    var start=this.beginExamAt.toDate();
    var end=this.endExamAt.toDate();
    if (this.folderseriesa != null) {
      this.folderseriesa.forEach((item) => {
        folderseries.pushObject(item.get("id"));
      });
    }
    if (this.examinatora != null) {
      this.examinatora.forEach((item) => {
        examinators.pushObject(item.get("id"));
      });
    }
    if (this.modula != null) {
      this.modula.forEach((item) => {
        moduls.pushObject(item.get("id"));
      });
    }
    if(!this.setRangeDate) start=null;
    let ergebnis =this.queryReports(moduls,examinators,folderseries,start,end);
    return ergebnis;
  }),
  reporttoedit: null,
  editReport: false,
  actions: {
    searchStudent: function(data) {
      var store = this.store;
      return store.query('student', {
        filter: {
          nameoruniid: '%' + data + '%'
        },
        page: {
          limit: 10
        }
      })
    },
    printReport: function(report) {
      this.set('reporttoprint',report);
      this.set('prd',true);
    },
    closePrintDialog: function(){
      this.set('reporttoprint',null);
      this.set('prd',false);
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
