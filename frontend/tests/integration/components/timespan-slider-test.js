import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | timespan slider', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{timespan-slider}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#timespan-slider}}
        template block text
      {{/timespan-slider}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
