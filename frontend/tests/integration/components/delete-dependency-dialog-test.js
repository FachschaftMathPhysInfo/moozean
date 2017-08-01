import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('delete-dependency-dialog', 'Integration | Component | delete dependency dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{delete-dependency-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#delete-dependency-dialog}}
      template block text
    {{/delete-dependency-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
