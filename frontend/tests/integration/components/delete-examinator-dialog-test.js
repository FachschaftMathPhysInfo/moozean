import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delete-examinator-dialog', 'Integration | Component | delete examinator dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{delete-examinator-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#delete-examinator-dialog}}
      template block text
    {{/delete-examinator-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
