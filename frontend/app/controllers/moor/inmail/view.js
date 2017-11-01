import Controller from '@ember/controller';

export default Controller.extend({
  fileName:"Datei hochladen",
    filetexName:"Datei hochladen",
    actions:{
      searchStudent:function(data){
        return this.store.query('student', {
          filter: {
            name: '%'+data+'%'
          },
          page:{
            limit:10
          }
        })
      },
      setTexFile:function(attachment){
        this.set("filetexName",attachment.get("name"));
        this.set("model.report.tex",attachment.get("attachment"));
      },
      setPdfFile:function(attachment){
        this.set("fileName",attachment.get("name"));
        this.set("model.report.pdf",attachment.get("pdf"));
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
        this.get('model.report').save().then(()=>{
          alert("Erfolgreich gespeichert!");
          this.set('model.report',this.store.createRecord('report'));
          this.set('fileName',"Datei hochladen");
          this.set('filetexName',"Datei hochladen");
        });
        this.set("student.report",true);
        this.get("student").save().then(null)
      }
    }
});
