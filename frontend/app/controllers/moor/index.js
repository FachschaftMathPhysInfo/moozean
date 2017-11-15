import Controller from '@ember/controller';

export default Controller.extend({
  leftSideBarOpen2: true,
  newfolder: {},
  limitFolders:5,
  pageFolder:1,
  fetched:computed('limitFolders','pageFolder','model.[]','model','showDialog', function() {
    let result= this.store.query("folderseries", {
      page: {
        number: this.get('pageFolder'),
        size: this.get("limitFolders")
      }
    });
    result.then((data) => {
      this.set("meta", data.get("meta"));
    })
    return result;
  }),
  actions: {
    addFolderseries: function() {
      this.set('newfolderseries', this.store.createRecord('folderseries'));
      this.set("showDialog", true);
    },
    deleteFolderSeries(folder) {
      if (folder.get("name") == prompt("Wirklich Ordnerreihe zerstören? Bitte trage den Namen der Ordnerserie ein:")) {
        folder.destroyRecord();
      }
    },
    closeDialog: function(option) {
      if (option == "ok") {
        this.get('newfolderseries').save();
      }
      else{
        this.get("newfolderseries").destroyRecord();
      }

      this.set('showDialog', false);
    },
  }
  });
