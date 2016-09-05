import { sum } from "last-strawberry/helpers/sum";
import { module, test } from "qunit";

module("Unit | Helper | sum");

test("should return the passed value when passed only one parameter", function(assert) {
  let result = sum([33]);
  assert.equal(result, "33");
});

test("should total when passed multiple parameters", function(assert) {
  let result = sum([1, 2, 3, 4]);
  assert.equal(result, "10");
});
