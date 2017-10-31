import Ember from 'ember';
import DS from 'ember-data';
export default Ember.Component.extend({
  store: Ember.inject.service(),
  elemente: Ember.computed('objekt',function(){
    switch(this.get('objekt').get('constructor.modelName')){
      case 'modul' :
        return 'Modul';
        break;
      case 'typ' :
        return 'Prüfungsart';
        break;
      case 'examinator' :
        return 'Prüfendes';
        break;
      case 'subject' :
        return 'Fach';
        break;
    }
  }),
  dieseselements: Ember.computed('objekt',function() {
    if(this.get('objekt')==null) return '';
    switch (this.get('objekt').get('constructor.modelName')){
      case 'modul' :
        return 'dieses Moduls';
        break;
      case 'typ' :
        return 'dieser Prüfungsart';
        break;
      case 'examinator' :
        return 'dieses Prüfenden';
        break;
      case 'subject' :
        return 'dieses Fachs';
        break;
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
