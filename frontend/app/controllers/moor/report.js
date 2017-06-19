import Ember from 'ember';

export default Ember.Controller.extend({
  fileName:"Datei hochladen",
  filetexName:"Datei hochladen",
  actions:{
    removeExaminator:function(examinator){
      this.get('model.report.examinators').removeObject(examinator);
    },
    addExaminator: function(examinator){
      this.get('model.report.examinators').pushObject(examinator);
    },
    removeFolderseries:function(folderseries){
      this.get('model.report.folderseries').removeObject(folderseries);
    },
    addFolderseries: function(folderseries){
      this.get('model.report.folderseries').pushObject(folderseries);
    },
    removeModul:function(modul){
      this.get('model.report.moduls').removeObject(modul);
    },
    addModul: function(modul){
      this.get('model.report.moduls').pushObject(modul);
    },
    fileLoaded:function(file) {
      this.set('model.report.pdf',file.data);
      this.set('fileName',file.filename);
    },
    fileLoadedTex:function(file) {
      this.set('model.report.tex',file.data);
      this.set('filetexName',file.filename);
    },
    save:function(){
      this.get('model.report').save().then((data)=>{
        alert("Erfolgreich gespeichert!");
        this.set('model.report',this.store.createRecord('report'));
        this.set('fileName',"Datei hochladen");
        this.set('filetexName',"Datei hochladen");
      });
    }
  }
});
