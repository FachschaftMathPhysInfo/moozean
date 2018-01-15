import EmberObject from '@ember/object';
import StudentManagmentMixin from 'ember-ozean/mixins/student-managment';
import { module, test } from 'qunit';

module('Unit | Mixin | student managment');

// Replace this with your real tests.
test('it works', function(assert) {
  let StudentManagmentObject = EmberObject.extend(StudentManagmentMixin);
  let subject = StudentManagmentObject.create();
  assert.ok(subject);
});
