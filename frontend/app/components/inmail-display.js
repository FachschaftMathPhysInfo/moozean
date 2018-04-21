import { schedule } from '@ember/runloop';
import { observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { A } from '@ember/array';
import Component from '@ember/component';

export default Component.extend({
  attachments: A([]),
  toBeInserted: A([]),
  setTexFile(){},
  setPdfFile(){},
  selectedAttachment:null,
  fullAttention: on('init', observer('model.attachments.[]', 'model.subject', function() {
    this.get("attachments").clear();
    schedule('afterRender', this, function() {
      this.set("toBeInserted", this.get("model.attachments").slice());
    });
  })),
  didRender: function() {
    this._super(...arguments);
    if (this.get("toBeInserted.length") > 0) {
      this.get("attachments").addObject(this.get("toBeInserted")[0]);
      this.get("toBeInserted").removeAt(0);
    }
  },
  actions:{
    setSelected(opt){
      this.set('selectedAttachment',opt);
    }
  }
});
