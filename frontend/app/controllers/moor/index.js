import { A } from '@ember/array';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  leftSideBarOpen2: true,
  newfolder: {},
  page: 1,
  resultsLength:computed('meta.record-count',function(){
    return this.get("meta.record-count");
  }),
  pages: computed('meta.page-count', function() {
    let e = A();
    console.log(this.get("meta.page-count"));
    for (let i = 1; i <= this.get("meta.page-count"); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  limitOptions: A([5, 10, 15]),
  limit:5,
  paginatedResults: computed('page', 'limit', function() {
    let result= this.store.query("folderseries", {
      page: {
        number: this.get('page'),
        size: this.get("limit")
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
        this.get('newfolderseries').save().then(null)
      }
      this.set('showDialog', false);
    },
    incrementPage: function() {
      let page = this.get('page');
      let max = this.get('pages').reduce((prev, curr) => curr > prev
        ? curr
        : prev, 0);
      if (page < max) {
        this.set('page', page + 1);
      }
    },
    decrementPage: function() {
      let page = this.get('page');
      if (page > 0) {
        this.set('page', page - 1);
      }
    }
  }
  });
