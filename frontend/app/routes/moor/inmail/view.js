import Ember from 'ember';

export default Ember.Route.extend({
  model:function(params){
    return Ember.RSVP.hash({
      examinators:this.store.findAll('examinator'),
      folderseries:this.store.findAll('folderseries'),
      subjects:this.store.findAll('subject'),
      typs:this.store.findAll('typ'),
      moduls:this.store.findAll('modul'),
      report: this.store.createRecord('report',{pdf:'',tex:'',examinationDate:moment()}),
      mail:this.store.find('inmail',params.id)
    });
  }
});
