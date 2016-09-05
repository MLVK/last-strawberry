import { adding } from "last-strawberry/helpers/adding";
import { module, test } from "qunit";

module("Unit | Helper | adding");

test("should return the passed value when passed only one parameter", function(assert) {
  let result = adding([33]);
  assert.equal(result, "33");
});

test("should total when passed multiple parameters", function(assert) {
  let result = adding([1, 2, 3, 4]);
  assert.equal(result, "10");
});
