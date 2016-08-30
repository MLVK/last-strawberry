import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import page from "last-strawberry/tests/pages/navigation";
import Ember from "ember";

import {
  mockFindAll
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | navigation", {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll("company");
    mockFindAll("item");
    mockFindAll("order");

    Ember.$.mockjax({ url: `https://api.mapbox.com*`, responseText: {}, type: "GET" });
  }
});

test("redirects to sales orders page when navigating to index", async function(assert) {
  await page.visitIndex();

  assert.equal(currentURL(), "/sales-orders")
});

test("redirects to sales orders page when clicking on Home link", async function(assert) {
  await page
    .visitOrders()
    .clickHomeLink();

  assert.equal(currentURL(), "/sales-orders")
});

test("redirects to orders page when clicking on an order", async function(assert) {
  await page
    .visitIndex()
    .clickOrdersItem();

  assert.equal(currentURL(), "/sales-orders")
});

test("redirects to purchases page when clicking on Purchases item", async function(assert) {
  await page
    .visitIndex()
    .clickPurchasesItem();

  assert.equal(currentURL(), "/purchase-orders")
});

test("redirects to distribution page when clicking on Distribution item", async function(assert) {
  mockFindAll("route-visit");
  mockFindAll("route-plan-blueprint");
  mockFindAll("route-plan");
  mockFindAll("user");

  await page
    .visitIndex()
    .clickDistributionItem();

  assert.equal(currentURL(), "/distribution");
});

// test("redirects to products page when clicking on Products item", async function(assert) {
//
//   // mockFindAll("route-visit", 10);
//   // mockFindAll("route-plan-blueprint", 10);
//   // mockFindAll("user", 10);
//
//   await page
//     .visitIndex()
//     .showPopUpMenu()
//     .clickProductsItem();
//
//   assert.equal(currentURL(), "/products");
// });
