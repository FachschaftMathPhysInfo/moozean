import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  pruefende:Ember.A(),
  module:Ember.A(),
  printselection:Ember.A(),
  selectedDate:null,
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
    printReport:function(report, times){
      let printout=this.store.createRecord('printout',{report:report,times:times});
      printout.save();
    },
    toggleSelection:function(report){
      let a=this.get('printselection').filter(function(item){return item.get('report.id')==report.get('id')});
      if(a.length>0){
        this.get('printselection').removeObject(a[0]);
      }
      else{
        this.get('printselection').pushObject(this.store.createRecord('printout',{report:report,times:1}));
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
      let _this=this;
      this.get('model.reports').forEach(function(report){
        let printout=_this.store.createRecord('printout',{report:report,times:1});
        printout.save();
      });
    },
    printShown:function(){
      let _this=this;
      this.get('gefilterte').forEach(function(report){
        let printout=_this.store.createRecord('printout',{report:report,times:1});
        printout.save();
      });
    },
    printSelection:function(){
      this.get('printselection').forEach(function(printout){
        printout.save();
      });
      this.set('printselection',Ember.A());
    }
  }
});
