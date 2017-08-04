import Ember from 'ember';

export default Ember.Component.extend({
  fileName:"bisherige Datei",
  filetexName:"bisherige Datei",
  actions:{
    fileLoaded:function(file) {
      this.set('report.pdf',file.data);
      this.set('fileName',file.filename);
    },
    fileLoadedTex:function(file) {
      this.set('report.tex',file.data);
      this.set('filetexName',file.filename);
    },
    exitDialog:function(option){
      this.sendAction('closeDialog',option,this.get('report'));
    }
    }
});
