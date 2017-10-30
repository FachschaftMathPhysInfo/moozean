import Ember from 'ember';

export default Ember.Controller.extend({
  leftSideBarOpen2: true,
  newfolder: {},
  page: 1,
  resultsLength:Ember.computed('meta.record-count',function(){
    return this.get("meta.record-count");
  }),
  pages: Ember.computed('meta.page-count', function() {
    let e = Ember.A();
    console.log(this.get("meta.page-count"));
    for (let i = 1; i <= this.get("meta.page-count"); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  limitOptions: Ember.A([5, 10, 15]),
  limit:5,
  paginatedResults: Ember.computed('page', 'limit', function() {
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
        this.get('newfolderseries').save().then(null, this.ajaxError.bind(this))
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
