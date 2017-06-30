import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('print-examinators-dialog', 'Integration | Component | print examinators dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{print-examinators-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#print-examinators-dialog}}
      template block text
    {{/print-examinators-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
