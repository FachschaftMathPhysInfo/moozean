import EmberObject from '@ember/object';
import AjaxerrorHandlingMixin from 'ember-ozean/mixins/ajaxerror-handling';
import { module, test } from 'qunit';

module('Unit | Mixin | ajaxerror handling');

// Replace this with your real tests.
test('it works', function(assert) {
  let AjaxerrorHandlingObject = EmberObject.extend(AjaxerrorHandlingMixin);
  let subject = AjaxerrorHandlingObject.create();
  assert.ok(subject);
});
