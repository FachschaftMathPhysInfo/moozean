import { computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import paginatedResult from "ember-ozean/mixins/paginated-result";
export default Controller.extend(paginatedResult,{
  pruefende:A(),
  module:A(),
  printselection:A(),
  selectedDate:null,
  pruefauswahl:A(),
  reportslist:A(),
  auswahl:false,
  limitOptions: A([5, 10, 15]),
  limit: 5,
  resultsLength:computed('meta.record-count', function() {
    return this.get("meta.record-count");
  }),
  page: 1,
  queryReports:function(moduls,examinators,folderseries){
    let ergebnis = this.get('store').query('report', {
      filter: {
        subject: this.get('subject.id'),
        typ: this.get('typ.id'),
        moduls: moduls,
        examinators: examinators,
        folderseries: folderseries
      }, page: {size: this.get("limit"),number:this.get("page")}
    });
    ergebnis.then((data) => {
      this.set("meta",data.meta);
      this.set("loading", false);
    });
    return ergebnis;
  },
  results: computed('pruefende.[]', 'module.[]', 'subject', 'typ','page','limit', function() {
    this.set("loading", true);
    let moduls = [];
    let examinators = [];
    let folderseries = [this.get("model.id")];
    if (this.get("pruefende") != null) {
      this.get("pruefende").forEach((item) => {
        examinators.pushObject(item.get("id"));
      });
    }
    if (this.get("module") != null) {
      this.get("module").forEach((item) => {
        moduls.pushObject(item.get("id"));
      });
    }
    let ergebnis = this.queryReports
    return ergebnis;
  }),
  createPrintout: function(item) {
    return this.store.createRecord('printout',{report:item.report,times:1,folderseries:this.get('model'),examinator:item.examinator});
  },
  printMany: function(query){
    this.set('reportslist',this.get(query));
    this.set('auswahl',false);
    this.set('showPruefDialog',true);
  },
  actions:{
    removeExaminator:function(examinator){
      this.get('pruefende').removeObject(examinator);
    },
    addExaminator: function(examinator){
      this.get('pruefende').pushObject(examinator);
    },
    removeModul:function(modul){
      this.get('module').removeObject(modul);
    },
    addModul: function(modul){
      this.get('module').pushObject(modul);
    },
    printReportCon:function(report) {
      this.set('reportslist',[report]);
      this.set('auswahl',false);
      this.set('showPruefDialog',true);
    },
    increaseTimes:function(select){
      select.set('times',select.get('times')+1);
    },
    decreaseTimes:function(select){
      if(select.get('times')>1){
        select.set('times',select.get('times')-1);
      }
      else{
        this.get('printselection').removeObject(select);
        this.set('printselection',this.get('printselection').slice());
      }
    },
    printAll:function(){
      this.printMany('model.reports');
    },
    printShown:function(){
      this.printMany('gefilterte');
    },
    printSelection:function(){
      this.get('printselection').forEach((printout)=>{
        printout.save().then(null)
      });
      this.set('printselection',[]);
    },
    closeDialogAuswahl:function(option){
      if(option=="ok"){
        this.get('pruefauswahl').forEach((item)=>{
          let a=this.createPrintout(item);
          this.get('printselection').pushObject(a);
        });
      }
      this.set('reportslist',[]);
      this.set('showPruefDialog',false);
    },
    closeDialogDrucken:function(option){
      if(option=="ok"){
        this.get('pruefauswahl').forEach((item)=>{
          let pr=this.createPrintout(item);
          pr.save().then(null)
        });
      }
      this.set('reportslist',[]);
      this.set('showPruefDialog',false);
    }
  }
});
