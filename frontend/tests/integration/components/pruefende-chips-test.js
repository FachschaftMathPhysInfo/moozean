import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pruefende-chips', 'Integration | Component | pruefende chips', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pruefende-chips}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pruefende-chips}}
      template block text
    {{/pruefende-chips}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
