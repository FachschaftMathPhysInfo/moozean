import Ember from 'ember';

export default Ember.Controller.extend({
  newsubject:{},
  newtyp:{},
  newmodul:{},
  limitSubject:5,
  pageSubject:1,
  paginatedSubjects:Ember.computed('limitSubject','pageSubject','model.subjects.[]', function() {
    let q= this.store.query('subject', { page:{number:this.get("pageSubject"),size:this.get("limitSubject")}});
    q.then((data)=>{
      this.set("metaSubject",data.get("meta"));
    });
    return q;
  }),
  limitTyp:5,
  pageTyp:1,
  paginatedTyps:Ember.computed('limitTyp','pageTyp','model.typs.[]', function() {
    let q= this.store.query('typ', { page:{number:this.get("pageTyp"),size:this.get("limitTyp")}});
    q.then((data)=>{
      this.set("metaTyp",data.get("meta"));
    });
    return q;
  }),
  limitModul:5,
  pageModul:1,
  paginatedModuls:Ember.computed('limitModul','pageModul','model.moduls.[]', function() {
    let q= this.store.query('modul', { page:{number:this.get("pageModul"),size:this.get("limitModul")}});
    q.then((data)=>{
      this.set("metaModul",data.get("meta"));
    });
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
        this.get('newmodul').save().then(null,this.ajaxError.bind(this))
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
        this.get('newsubject').save().then(null,this.ajaxError.bind(this))
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
        this.get('newtyp').save().then(null,this.ajaxError.bind(this))
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
