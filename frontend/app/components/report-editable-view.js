import Component from '@ember/component';

export default Component.extend({
  fileName:"In Datenbank",
  filetexName:"In Datenbank",
  actions: {
    saveChanges:function(){
      this.report.save();
    },
    fileLoaded:function(file) {
      this.set('report.pdf',file.data);
      this.set('fileName',file.filename);
    },
    fileLoadedTex:function(file) {
      this.set('report.tex',file.data);
      this.set('filetexName',file.filename);
    }
  }
});
