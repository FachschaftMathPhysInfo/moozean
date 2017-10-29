import { moduleForModel, test } from 'ember-qunit';

moduleForModel('folderseries', 'Unit | Serializer | folderseries', {
  // Specify the other units that are required for this test.
  needs: ['serializer:folderseries']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
