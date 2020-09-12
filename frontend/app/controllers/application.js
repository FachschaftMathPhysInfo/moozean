import Controller from '@ember/controller';

export default Controller.extend({
  open:false,
  actions: {
    toggleExpandedItem(value, ev) {
      if (this.expandedItem === value) {
        value = null;
      }
      this.set('expandedItem', value);
      ev.stopPropagation();
    }
  }


  });
