import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  pruefende:Ember.A(),
  module:Ember.A(),
  printselection:Ember.A(),
  selectedDate:null,
  pruefauswahl:Ember.A(),
  reportslist:Ember.A(),
  auswahl:false,
  limitOptions: Ember.A([5, 10, 15]),
  limit: 5,
  pages: Ember.computed('limit', 'gefilterte.[]', function() {
    let e = Ember.A();
    for (let i = 1; i < Math.ceil(this.get("gefilterte.length") / this.get("limit")); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  page: 1,
  paginatedResults: Ember.computed('gefilterte.[]', 'page', 'limit', function() {
    let ind = (this.get('page') - 1) * this.get('limit');
    return Ember.A(this.get("gefilterte").toArray().slice(ind, ind + this.get('limit')));
  }),
  gefilterte:Ember.computed('pruefende.[]','module.[]','selectedTyp','selectedDate','selectedID','selectedSubject','model.reports.[]', function() {
    let pruefende= this.get('pruefende');
    let module = this.get('module');
    let selectedTyp=this.get('selectedTyp');
    let selectedID=this.get('selectedID');
    let selectedSubject=this.get('selectedSubject');
    let selectedDate = this.get('selectedDate');
    let reports=this.get('model.reports');
    if(pruefende.length>0) {
      reports = reports.filter(function(report){
        let result = true;
        pruefende.forEach(function(pruefer){
          let examers= report.get('examinators');
          let is_included=false;
          examers.forEach(function(examer){
            is_included |=examer.get('id')==pruefer.get('id');
          });
          result &= is_included;
        });
        return result;
      });
    }
    if(module.length>0) {
      reports= reports.filter(function(report){
        let result = true;
        module.forEach(function(modul){
          let moduls= report.get('moduls');
          let is_included=false;
          moduls.forEach(function(m){
            is_included |=m.get('id')==modul.get('id');
          });
          result &= is_included;
        });
        return result;
      });
    }
    if(selectedTyp){
      reports= reports.filter(function(report){
        return report.get('typ.id')== selectedTyp.get('id');
      });
    }
    if(selectedID){
      reports= reports.filter(function(report){
        return report.get('id') == selectedID.get('id');
      });
    }
    if(selectedSubject){
      reports= reports.filter(function(report){
        return report.get('subject.id')== selectedSubject.get('id');
      });
    }
    if(selectedDate){
      reports= reports.filter(function(report){
        return moment(selectedDate).isBefore(moment(report.get('examinationAt')));
      });
    }
     return reports;
  }),
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
      this.set('reportslist',this.get('model.reports'));
      this.set('auswahl',false);
      this.set('showPruefDialog',true);
    },
    printShown:function(){
      this.set('reportslist',this.get('gefilterte'));
      this.set('auswahl',false);
      this.set('showPruefDialog',true);
    },
    printSelection:function(){
      this.get('printselection').forEach((printout)=>{
        printout.save().then(null,this.ajaxError.bind(this))
      });
      this.set('printselection',[]);
    },
    closeDialogAuswahl:function(option){
      if(option=="ok"){
        this.get('pruefauswahl').forEach((item)=>{
          let a=this.store.createRecord('printout',{report:item.report,times:1,folderseries:this.get('model'),examinator:item.examinator});
          this.get('printselection').pushObject(a);
        });
      }
      this.set('reportslist',[]);
      this.set('showPruefDialog',false);
    },
    closeDialogDrucken:function(option){
      if(option=="ok"){
        this.get('pruefauswahl').forEach((item)=>{
          let pr=this.store.createRecord('printout',{report:item.report,times:1,folderseries:this.get('model'),examinator:item.examinator});
          pr.save().then(null,this.ajaxError.bind(this))
        });
      }
      this.set('reportslist',[]);
      this.set('showPruefDialog',false);
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
    }
  }
});
