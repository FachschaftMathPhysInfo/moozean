import Controller from '@ember/controller';

export default Controller.extend({
  fileName:"Datei hochladen",
  filetexName:"Datei hochladen",
  actions:{
    fileLoaded:function(file) {
      this.set('model.report.pdf',file.data);
      this.set('fileName',file.filename);
    },
    fileLoadedTex:function(file) {
      this.set('model.report.tex',file.data);
      this.set('filetexName',file.filename);
    },
    save:function(){
      this.get('model.report').save().then(()=>{
        alert("Erfolgreich gespeichert!");
        this.set('model.report',this.store.createRecord('report'));
        this.set('fileName',"Datei hochladen");
        this.set('filetexName',"Datei hochladen");
      });
    }
  }
});
