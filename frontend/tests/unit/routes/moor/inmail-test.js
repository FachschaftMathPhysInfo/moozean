import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | moor/inmail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:moor/inmail');
    assert.ok(route);
  });
});
