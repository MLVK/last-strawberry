import {
  minutesToTime,
  timeToMinutes
} from 'last-strawberry/utils/time';
import { module, test } from 'qunit';

module('Unit | Utils | time');

test('minutes to time function returns empty string when passed invalid minutes', function(assert) {
  const result = minutesToTime("eeee");
  assert.equal(result, "");
});

test('minutes to time function returns time string when passed minutes', function(assert) {
  const result = minutesToTime(150);
  assert.equal(result, "02:30am");
});

test('time to minutes function returns 0 when passed invalid time', function(assert) {
  const result = timeToMinutes("eeee");
  assert.equal(result, 0);
});

test('time to minutes function returns minutes when passed time', function(assert) {
  const result = timeToMinutes("02:30am");
  assert.equal(result, 150);
});
