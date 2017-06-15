import Ember from 'ember';

export default Ember.Controller.extend({
  newsubject:{},
  newtyp:{},
  newmodul:{},
  actions:{
    addModul:function(){
      this.set('newmodul',this.store.createRecord('modul'));
      this.set("showCreateModulDialog",true);
    },
    editModul:function(modul){
      this.set('newmodul',modul);
      this.set("showEditModulDialog",true);
    },
    deleteModul:function(modul){
      modul.destroyRecord();
    },
    closeModulDialog:function(option){
      if(option=="ok"){
        this.get('newmodul').save();
      } else
      {
        if(this.get('showCreateModulDialog')){
          this.get('newmodul').unloadRecord();
      }
      }
      this.set('showCreateModulDialog',false);
      this.set('showEditModulDialog',false);
    },
    addSubject:function(){
      this.set('newsubject',this.store.createRecord('subject'));
      this.set("showCreateSubjectDialog",true);
    },
    editSubject:function(subject){
      this.set('newsubject',subject);
      this.set("showEditSubjectDialog",true);
    },
    deleteSubject:function(subject){
      subject.destroyRecord();
    },
    closeSubjectDialog:function(option){
      if(option=="ok"){
        this.get('newsubject').save();
      } else
      {
        if(this.get('showCreateSubjectDialog')){
          this.get('newsubject').unloadRecord();
      }
      }
      this.set('showCreateSubjectDialog',false);
      this.set('showEditSubjectDialog',false);
    },
    addTyp:function(){
      this.set('newtyp',this.store.createRecord('typ'));
      this.set("showCreateTypDialog",true);
    },
    editTyp:function(typ){
      this.set('newtyp',typ);
      this.set("showEditTypDialog",true);
    },
    deleteTyp:function(typ){
      typ.destroyRecord();
    },
    closeTypDialog:function(option){
      if(option=="ok"){
        this.get('newtyp').save();
      } else
      {
        if(this.get('showCreateTypDialog'))
        this.get('newtyp').unloadRecord();
      }
      this.set('showCreateTypDialog',false);
      this.set('showEditTypDialog',false);
    }
  }
});
