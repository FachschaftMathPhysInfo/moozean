import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('examinator-dialog', 'Integration | Component | examinator dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{examinator-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#examinator-dialog}}
      template block text
    {{/examinator-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
