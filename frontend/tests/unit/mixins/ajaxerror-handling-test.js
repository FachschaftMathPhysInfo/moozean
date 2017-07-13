import Ember from 'ember';
import AjaxerrorHandlingMixin from 'ember-ozean/mixins/ajaxerror-handling';
import { module, test } from 'qunit';

module('Unit | Mixin | ajaxerror handling');

// Replace this with your real tests.
test('it works', function(assert) {
  let AjaxerrorHandlingObject = Ember.Object.extend(AjaxerrorHandlingMixin);
  let subject = AjaxerrorHandlingObject.create();
  assert.ok(subject);
});
