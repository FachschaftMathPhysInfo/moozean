import Controller from '@ember/controller';
import texUploading from "ember-ozean/mixins/tex-uploading";

export default Controller.extend(texUploading,{
  fileName:"PDF hochladen",
  filetexName:"TeX hochladen",
  actions:{
    fileLoaded:function(file) {
      console.log(file);
      this.set('model.report.pdf',file.data);
      this.set('fileName',file.filename);
    },
    fileLoadedTex:function(file) {
      console.log(file);
      this.set('model.report.tex',file.data);
      this.set('filetexName',file.filename);
    },
    save:function(){
      this.saveFile();
    },
    closePrintDialog:function(){
      this.set("prd",false);
    }
  }
});
