import EmberObject from '@ember/object';
import PaginatedResultMixin from 'ember-ozean/mixins/paginated-result';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated result');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedResultObject = EmberObject.extend(PaginatedResultMixin);
  let subject = PaginatedResultObject.create();
  assert.ok(subject);
});
