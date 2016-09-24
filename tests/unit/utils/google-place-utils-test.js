import { placeToObject } from "last-strawberry/utils/google-place-utils";
import { module, test } from "qunit";
import {
  VALID_RESPONSE,
  INVALID_REPONSE_MISSING_STREET_INFO
} from "last-strawberry/tests/mocks/google-places";

const INVALID_OBJECT = {
  "lat": undefined,
  "lng": undefined,
  "street": ""
};

module("Unit | Utils | google place utils");

test("returns valid object when input place is valid", function(assert) {
  const result = placeToObject(VALID_RESPONSE);

  assert.deepEqual(result, {
    "city": "Boston",
    "lat": 42.3467625,
    "lng": -71.06871519999999,
    "state": "MA",
    "street": "418 Tremont St",
    "streetName": "Tremont St",
    "streetNumber": "418",
    "zip": "02116"
  });
});

test("returns valid object when input place is valid", function(assert) {
  const result = placeToObject(INVALID_REPONSE_MISSING_STREET_INFO);

  assert.deepEqual(result, {
    "city": "Boston",
    "lat": 42.3467625,
    "lng": -71.06871519999999,
    "state": "MA",
    "zip": "02116",
    "street": ""
  });
});

test("returns empty object when empty place is passed", function(assert) {
  const result = placeToObject({});

  assert.deepEqual(result, INVALID_OBJECT);
});

test("returns empty object when undefined is passed", function(assert) {
  const result = placeToObject(undefined);

  assert.deepEqual(result, INVALID_OBJECT);
});

test("returns empty object when string is passed", function(assert) {
  const result = placeToObject("xxx");

  assert.deepEqual(result, INVALID_OBJECT);
});
