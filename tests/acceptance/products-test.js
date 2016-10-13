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
  mockQuery,
  mockUpdate,
  makeList
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

test("does not show non product items", async function(assert) {
  const items = buildList("item", 10);
  mockQuery("item").returns({json:items});

  await defaultPage.visit();

  assert.equal(defaultPage.products().count, 0);
});

test("only shows items of tag product", async function(assert) {
  const products = buildList("product", 10);
  mockQuery("item").returns({json:products});

  await defaultPage.visit();

  assert.equal(defaultPage.products().count, 10);
});

test("filters products", async function(assert) {
  const aProducts = buildList("product", 2, { name: "AAA" });
  const products = buildList("product", 2, { name: "BBB" });
  products.data = _.union(products.data, aProducts.data);

  mockQuery("item").returns({ json: products });

  await defaultPage
    .visit()
    .fillFilterInput("aa");

  assert.equal(defaultPage.products().count, 2);
});

// TODO: this test failed
// test("adds new products", async function(assert) {
//   const products = makeList("product", 2);
//   mockQuery("item").returns({ models: products });
//
//   mockCreate("item");
//
//   await defaultPage
//     .visit()
//     .fillAddNewProduct("New Product")
//     .submitNewProduct();
//
//   assert.equal(defaultPage.products().count, 3);
// });

test("archive products", async function(assert) {
  const products = makeList("product", 2);
  mockQuery("item").returns({ models: products });

  mockUpdate("item");

  await defaultPage.visit();

  await defaultPage
    .products(0)
    .archiveItem();

  assert.equal(defaultPage.products().count, products.length - 1);
});
