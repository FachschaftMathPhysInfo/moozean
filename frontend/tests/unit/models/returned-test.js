import { moduleForModel, test } from 'ember-qunit';

moduleForModel('returned', 'Unit | Model | returned', {
  // Specify the other units that are required for this test.
  needs: ['model:student', 'model:folder']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
