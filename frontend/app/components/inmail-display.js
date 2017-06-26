import Ember from 'ember';

export default Ember.Component.extend({
  attachments: Ember.A([]),
  toBeInserted: Ember.A([]),
  setTexFile(){},
  setPdfFile(){},
  fullAttention: Ember.on('init', Ember.observer('model.attachments.[]', 'model.subject', function() {
    this.get("attachments").clear();
    Ember.run.schedule('afterRender', this, function() {
      this.set("toBeInserted", this.get("model.attachments").slice());
    });
  })),
  didRender: function() {
    this._super(...arguments);
    if (this.get("toBeInserted.length") > 0) {
      this.get("attachments").addObject(this.get("toBeInserted")[0]);
      this.get("toBeInserted").removeAt(0);
    }
  }
});
