import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import page from "last-strawberry/tests/pages/items";

import {
  buildList,
  mockQuery
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | items", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test("does not show non ingredients items", async function(assert) {
  const products = buildList("product", 10);
  mockQuery("item").returns({json:products});

  await page.visit();

  assert.equal(page.items().count, 0);
});

test("only shows items of tag ingredient", async function(assert) {
  const ingredients = buildList("ingredient", 10);
  mockQuery("item").returns({json:ingredients});

  await page.visit();

  assert.equal(page.items().count, 10);
});
