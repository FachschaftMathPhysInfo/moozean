import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { A } from '@ember/array';
export default Mixin.create({
  pages: computed('meta.page-count', function() {
    let e = A();
    for (let i = 1; i <= this.get("meta.page-count"); i++) {
      e.pushObject(i);
    }
    return e;
  }),
  queryPaginated: function( model,page,limit,metaending=""){
    let result= this.store.query(model, {
      page: {
        number: page,
        size: limit
      }
    });
    result.then((data) => {
      this.set("meta"+metaending, data.get("meta"));
    });
    return result;
  },
  actions:{
      incrementPage: function() {
      let page = this.get('page');
      let max = this.get('pages').reduce((prev, curr) => curr > prev
        ? curr
        : prev, 0);
      if (page < max) {
        this.set('page', page + 1);
      }},
      decrementPage: function() {
      let page = this.get('page');
      if (page > 0) {
        this.set('page', page - 1);
      }
    }
}
});
