import {
  formatDate,
  formatFullDate
} from "last-strawberry/utils/date";

import {
  module,
  test
} from "qunit";

module("Unit | Utils | date");

test("returns formated date string by YYYY-MM-DD format", function(assert) {
  const date = new Date(2016, 10, 12);
  const result = formatDate(date);
  assert.equal(result, "2016-11-12", "formatDate did not return expected value");
});

test("returns formated date string by ddd MM-DD-YYYY format", function(assert) {
  const date = new Date(2016, 10, 12);
  const result = formatFullDate(date);
  assert.equal(result, "Sat 11-12-2016", "formatFullDate did not return expected value");
});
