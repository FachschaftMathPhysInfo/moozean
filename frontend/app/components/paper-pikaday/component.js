import { isEmpty } from '@ember/utils';
import PikadayMixin from 'ember-pikaday/mixins/pikaday';
import PaperInput from 'ember-paper/components/paper-input';
import layout from 'ember-paper/templates/components/paper-input';

export default PaperInput.extend(PikadayMixin, {
  layout,
format:"MM.YYYY",
  didInsertElement() {
    this._super(...arguments);
    this.set('field', this.element.children[1]);
    this.setupPikaday();
  },

  onPikadayOpen: function() {
    this.get('onOpen')();
  },

  onPikadayClose: function() {
    this.get('onSelection')(this.get('pikaday').getDate());
    if (this.get('pikaday').getDate() === null || isEmpty(this.$(this.field).val())) {
      this.set('value', null);
      this.get('onSelection')(null);
    } else {
      this.set('value', this.get('pikaday').toString(this.get('format')));
    }

    this.get('onClose')();
  },
});
