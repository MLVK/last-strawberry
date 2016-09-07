import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import {
  defaultPage
} from "last-strawberry/tests/pages/products";
import {
  authenticateSession,
  invalidateSession
} from "last-strawberry/tests/helpers/ember-simple-auth";

import {
  buildList,
  mockQuery
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | products", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test("guests cannot visit products", async function(assert) {
  invalidateSession(this.application);

  await defaultPage.visit();

  assert.equal(currentURL(), "/login");
});

test("shows items when present", async function(assert) {
  const products = buildList("product", 10);
  mockQuery("item").returns({json:products});

  await defaultPage.visit();

  assert.equal(defaultPage.products().count, 10);
});
