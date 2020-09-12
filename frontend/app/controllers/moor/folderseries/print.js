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
    let ergebnis = this.store.query('report', {
      filter: {
        subject: this.get('subject.id'),
        typ: this.get('typ.id'),
        moduls: moduls,
        examinators: examinators,
        folderseries: folderseries
      }, page: {size: this.limit,number:this.page}
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
    if (this.pruefende != null) {
      this.pruefende.forEach((item) => {
        examinators.pushObject(item.get("id"));
      });
    }
    if (this.module != null) {
      this.module.forEach((item) => {
        moduls.pushObject(item.get("id"));
      });
    }
    let ergebnis = this.queryReports(moduls,examinators,folderseries);
    return ergebnis;
  }),
  createPrintout: function(item) {
    return this.store.createRecord('printout',{report:item.report,times:1,folderseries:this.model,examinator:item.examinator});
  },
  printMany: function(query){
    this.set('reportslist',this.get(query));
    this.set('auswahl',false);
    this.set('showPruefDialog',true);
  },
  actions:{
    removeExaminator:function(examinator){
      this.pruefende.removeObject(examinator);
    },
    addExaminator: function(examinator){
      this.pruefende.pushObject(examinator);
    },
    removeModul:function(modul){
      this.module.removeObject(modul);
    },
    addModul: function(modul){
      this.module.pushObject(modul);
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
        this.printselection.removeObject(select);
        this.set('printselection',this.printselection.slice());
      }
    },
    printAll:function(){
      if(confirm("Möchtest du den gesamten Ordner ausdrucken?")) {
        this.set("printing",true);
        this.store.createRecord('printoutfolder',{times:1,folderseries:this.model}).save().then(()=>{
          this.set("printing",false);
        });
      }
    },
    printShown:function(){
      this.printMany('gefilterte');
    },
    printSelection:function(){
      this.printselection.forEach((printout)=>{
        printout.save().then(null)
      });
      this.set('printselection',[]);
    },
    closeDialogAuswahl:function(option){
      if(option=="ok"){
        this.pruefauswahl.forEach((item)=>{
          let a=this.createPrintout(item);
          this.printselection.pushObject(a);
        });
      }
      this.set('reportslist',[]);
      this.set('showPruefDialog',false);
    },
    closeDialogDrucken:function(option){
      if(option=="ok"){
        this.pruefauswahl.forEach((item)=>{
          let pr=this.createPrintout(item);
          pr.save().then(null)
        });
      }
      this.set('reportslist',[]);
      this.set('showPruefDialog',false);
    }
  }
});
