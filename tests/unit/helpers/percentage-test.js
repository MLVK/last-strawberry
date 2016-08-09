import { percentage } from 'last-strawberry/helpers/percentage';
import { module, test } from 'qunit';

module('Unit | Helper | percentage');

test('should format with % sign when passed float between 0 and 1', function(assert) {
  let result = percentage([0.23]);
  assert.equal(result, '23 %');
});
