import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | delete report dialog', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{delete-report-dialog}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#delete-report-dialog}}
        template block text
      {{/delete-report-dialog}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
