import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | moor/folderseries/print', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:moor/folderseries/print');
    assert.ok(route);
  });
});
