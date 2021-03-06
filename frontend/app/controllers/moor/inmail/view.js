import Controller from '@ember/controller';
import texUploading from "ember-ozean/mixins/tex-uploading";
import studentManagment from "ember-ozean/mixins/student-managment";
export default Controller.extend(texUploading,studentManagment,{
  saving:false,
  fileName:"PDF hochladen",
    filetexName:"TeX hochladen",
    actions:{
      reply(){
        this.set("showReplyDialog",true);
        this.set('newmail', this.store.createRecord('email', {
          referencable: this.get("model.mail"),
          subject: "RE: "+this.get("model.mail.subject"),
          body: "Hallo " + this.get("model.mail.fromname").split(" ")[0] + ",\nvielen Dank für dein Protokoll! Falls du mal Pfand gezahlt hattest, kannst du das gegen Vorlage der Quittung im Fachschaftsraum 1.301 im Mathematikon abholen. Komm' einfach so vorbei oder ruf vorher an unter 06221 5414999, um sicher zu gehen, dass jemand da ist. Du kannst uns natürlich auch eine Mail [1] schreiben und einen Termin ausmachen.\n\nDanke und viele Grüße\nNAMENAMENAME\nFachschaft MathPhysInfo\n\n[1] fachschaft@mathphys.stura.uni-heidelberg.de\nDeine Nachricht:\n===\n "+this.get("model.mail.body"),
          address: this.get("model.mail.fromaddress")
        }));
      },
      closeMailDialog(){
        this.get("newmail").save();
        this.set("showReplyDialog",false);
      },
      searchStudent:function(data){
        return this.store.query('student', {
          filter: {
            nameoruniid: '%'+data+'%'
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
        this.set('saving',true);
        this.saveFile();
        this.set("student.report",true);
        this.get("student").save().then(()=>{
          this.set('saving',false);
        });
      },
      closePrintDialog:function(){
        this.set("prd",false);
      }
    }
});
