import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('student-create-dialog', 'Integration | Component | student create dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{student-create-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#student-create-dialog}}
      template block text
    {{/student-create-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
