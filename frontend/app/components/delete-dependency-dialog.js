import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import DS from 'ember-data';
export default Component.extend({
  store: service(),
  elemente: computed('objekt',function(){
    switch(this.objekt.get('constructor.modelName')){
      case 'modul' :
        return 'Modul';
      case 'typ' :
        return 'Prüfungsart';
      case 'examinator' :
        return 'Prüfendes';
      case 'subject' :
        return 'Fach';
    }
  }),
  dieseselements: computed('objekt',function() {
    if(this.objekt==null) return '';
    switch (this.objekt.get('constructor.modelName')){
      case 'modul' :
        return 'dieses Moduls';
      case 'typ' :
        return 'dieser Prüfungsart';
      case 'examinator' :
        return 'dieses Prüfenden';
      case 'subject' :
        return 'dieses Fachs';
    }
  }),
  actions: {
    exitDialog: function(option) {
      if (option == "ok") {
        let zusatz='';
        if(this.get('objekt.constructor.modelName')=='examinator' || this.get('objekt.constructor.modelName')=='modul'){
          zusatz='s';
        }
        this.get('objekt.reports').forEach((report) => {
          if (report.get(this.get('objekt.constructor.modelName') + zusatz).length==1){
            report.destroyRecord();
          }
        });
      }
      this.sendAction('closeDialog', option);
    },
    multiple: function(report) {
      let zusatz='';
      if(this.get('objekt.constructor.modelName')=='examinator' || this.get('objekt.constructor.modelName')=='modul'){
        zusatz='s';
      }
      return DS.PromiseObject.create({
        promise: report.get(this.get('objekt.constructor.modelName') + zusatz).then((list) => {
          return list.length > 1;
        })
      });
    },
  }
});
