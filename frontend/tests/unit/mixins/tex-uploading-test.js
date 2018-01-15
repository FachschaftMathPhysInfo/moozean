import EmberObject from '@ember/object';
import TexUploadingMixin from 'ember-ozean/mixins/tex-uploading';
import { module, test } from 'qunit';

module('Unit | Mixin | tex uploading');

// Replace this with your real tests.
test('it works', function(assert) {
  let TexUploadingObject = EmberObject.extend(TexUploadingMixin);
  let subject = TexUploadingObject.create();
  assert.ok(subject);
});
