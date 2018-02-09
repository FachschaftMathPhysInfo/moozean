import Mixin from '@ember/object/mixin';

export default Mixin.create({
  saveFile: function(additionalMessage=""){
      this.set("savingReport",true);
      this.get('model.report').save().then(()=>{
        this.set("savingReport",false);
      alert("Erfolgreich gespeichert!"+additionalMessage);
      this.set('model.report',this.store.createRecord('report'));
      this.set('fileName',"Datei hochladen");
      this.set('filetexName',"Datei hochladen");
    });
  }
});
