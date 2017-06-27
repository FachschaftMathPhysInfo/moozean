import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('typ-autocomplete', 'Integration | Component | typ autocomplete', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{typ-autocomplete}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#typ-autocomplete}}
      template block text
    {{/typ-autocomplete}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
