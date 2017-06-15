import Ember from 'ember';

export default Ember.Controller.extend({
  pruefende:Ember.A(),
  module:Ember.A(),
  gefilterte:Ember.computed('pruefende.[]','module.[]','selectedTyp','selectedSubject','model.reports.[]', function() {
    let pruefende= this.get('pruefende');
    let module= this.get('module');
    let selectedTyp=this.get('selectedTyp');
    let selectedSubject=this.get('selectedSubject');
    let reports=this.get('model.reports');
    if(pruefende.length>0) {
      reports= reports.filter(function(report){
        console.log(pruefende, Ember.typeOf(pruefende),"step1");
        console.log(report.get('examinators'),Ember.typeOf(report.get('examinators')),report.get('tex'),"step1a");
        let result = true;
        pruefende.forEach(function(pruefer){
          let examers= report.get('examinators');
          console.log(examers, "step 2");
          let is_included=false;
          examers.forEach(function(examer){
            console.log(pruefer.get('id'), "step3");
            is_included |=examer.get('id')==pruefer.get('id');
          });
          console.log(is_included);
          result &= is_included;
        });
        return result;
      });
    }
    if(module.length>0) {
      reports= reports.filter(function(report){
        console.log(module, Ember.typeOf(module),"1step1");
        console.log(report.get('moduls'),Ember.typeOf(report.get('moduls')),report.get('tex'),"1step1a");
        let result = true;
        module.forEach(function(modul){
          let moduls= report.get('moduls');
          console.log(moduls, "1step 2");
          let is_included=false;
          moduls.forEach(function(m){
            console.log(m.get('id'), "1step3");
            is_included |=m.get('id')==modul.get('id');
          });
          console.log(is_included);
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
    if(selectedSubject){
      reports= reports.filter(function(report){
        return report.get('subject.id')== selectedSubject.get('id');
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
    printReport:function(report, times){
      let printout=this.store.createRecord('printout',{report:report,times:times});
      printout.save();
    }
  }
});
