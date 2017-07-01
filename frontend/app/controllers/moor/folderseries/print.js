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
    printReport:function(report) {
      this.set('reportslist',[report]);
      this.set('auswahl',false);
      this.set('showPruefDialog',true);
    },
    toggleSelection:function(report){
      let a=this.get('printselection').filter(function(item){return item.get('report.id')==report.get('id')});
      if(a.length>0){
        this.get('printselection').removeObject(a[0]);
      }
      else{
        this.set('reportslist',[report]);
        this.set('auswahl',true);
        this.set('showPruefDialog',true);
      }
      this.set('printselection',this.get('printselection').slice());
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
        printout.save();
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
          pr.save();
        });
      }
      this.set('reportslist',[]);
      this.set('showPruefDialog',false);
    }
  }
});
