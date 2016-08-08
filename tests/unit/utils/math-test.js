import { toPercentage } from 'last-strawberry/utils/math';
import { module, test } from 'qunit';

module('Unit | Utils | math');

test('passed through number between 0 and 1', function(assert) {
  let result = toPercentage(0.3);
  assert.equal(result, 0.3);
});

test('clamps to 1 when passed a number >= 1', function(assert) {
  let result = toPercentage("99");
  assert.equal(result, 1);
});

test('clamps to 0 when passed a negative number', function(assert) {
  let result = toPercentage('-99');
  assert.equal(result, 0);
});

test('clamps to 0 when passed a invalid number', function(assert) {
  let result = toPercentage('en');
  assert.equal(result, 0);
});
