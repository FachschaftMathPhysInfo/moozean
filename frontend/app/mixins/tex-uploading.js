import Mixin from '@ember/object/mixin';

export default Mixin.create({
  saveFile: function(additionalMessage=""){
      this.get('model.report').save().then(()=>{
      alert("Erfolgreich gespeichert!"+additionalMessage);
      this.set('model.report',this.store.createRecord('report'));
      this.set('fileName',"Datei hochladen");
      this.set('filetexName',"Datei hochladen");
    });
  }
});
