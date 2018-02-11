import Controller from '@ember/controller';
import texUploading from "ember-ozean/mixins/tex-uploading";

export default Controller.extend(texUploading, {
  createPrintout: function(item, folderseries, examinator) {
    return this.store.createRecord('printout', {
      report: item,
      times: 1,
      folderseries: folderseries,
      examinator: examinator
    });
  },
  actions: {
    printReport: function() {
      this.set("printDialog", true);
    },
    printDialog: function() {
      this.get("folderseriesToBePrint").forEach((item) => {
        this.get("examinatorsToBePrint").forEach((examinator) => {
          this.createPrintout(this.get("model.report"), item,examinator).save();
        });
      });
      this.set("examinatorDialog",false);
    }
  }
});
