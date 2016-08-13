import { helper as minutesToTime } from 'last-strawberry/helpers/minutes-to-time';
import { module, test } from 'qunit';

module('Unit | Helper | minutes to time');

test('it works', function(assert) {
  let result = minutesToTime([42]);
  assert.ok(result);
});
