import { computed } from '@ember/object';
import Controller from '@ember/controller';
import paginatedResults from "ember-ozean/mixins/paginated-result";

export default Controller.extend(paginatedResults,{
  newsubject:{},
  newtyp:{},
  newmodul:{},
  limitSubject:10,
  pageSubject:1,
  paginatedSubjects:computed('limitSubject','pageSubject','model.subjects.[]', function() {
    let q= this.queryPaginated("subject", this.get("pageSubject"),this.get("limitSubject"),"Subject");
    return q;
  }),
  limitTyp:10,
  pageTyp:1,
  paginatedTyps:computed('limitTyp','pageTyp','model.typs.[]', function() {
    let q= this.queryPaginated('typ',this.get("pageTyp"),this.get("limitTyp"),"Typ");
    return q;
  }),
  limitModul:10,
  pageModul:1,
  paginatedModuls:computed('limitModul','pageModul','model.moduls.[]', function() {
    let q= this.queryPaginated('modul', this.get("pageModul"),this.get("limitModul"),"Modul");
    return q;
  }),
  actions:{
    addModul:function(){
      this.set('newmodul',this.store.createRecord('modul'));
      this.set("showCreateModulDialog",true);
    },
    editModul:function(m){
      this.set('newmodul',m);
      this.set("showEditModulDialog",true);
    },
    deleteObject:function(subject){
      this.set('newobject',subject);
      this.set('showDeleteDialog',true);
    },
    closeDeleteDialog:function(option){
      this.set('showDeleteDialog',false);
      if(option=="ok"){
        this.get('newobject').destroyRecord();
      }
      this.set('newobject',null);
    },
    closeModulDialog:function(option){
      if(option=="ok"){
        this.get('newmodul').save().then(null)
      }
      else{
        this.get('newmodul').rollback();
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
    closeSubjectDialog:function(option){
      if(option=="ok"){
        this.get('newsubject').save().then(null)
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
    closeTypDialog:function(option){
      if(option=="ok"){
        this.get('newtyp').save().then(null)
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
