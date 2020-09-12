import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | moor/inmail/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:moor/inmail/index');
    assert.ok(route);
  });
});
