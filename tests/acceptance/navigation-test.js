import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import page from "last-strawberry/tests/pages/navigation";
import { buildRouteVisitesWithCompany } from "last-strawberry/tests/helpers/factory";

import {
  mockFindAll
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | navigation", {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll("company", 10);
    mockFindAll("price-tier", 10);
    mockFindAll("item", 10);
  }
});

test("redirects to companies page when navigating to index", async function(assert) {
  await page.visitIndex();

  assert.equal(currentURL(), "/customers")
});

test("redirects to companies page when clicking on Home link", async function(assert) {

  mockFindAll("order", 10);
  await page
    .visitOrders()
    .clickHomeLink();

  assert.equal(currentURL(), "/customers")
});

test("redirects to orders page when clicking on Orders item", async function(assert) {

  mockFindAll("order", 10);
  await page
    .visitIndex()
    .clickOrdersItem();

  assert.equal(currentURL(), "/sales-orders")
});

test("redirects to purchases page when clicking on Purchases item", async function(assert) {

  mockFindAll("order", 10);

  await page
    .visitIndex()
    .clickPurchasesItem();

  assert.equal(currentURL(), "/purchase-orders")
});

test("redirects to distribution page when clicking on Distribution item", async function(assert) {

  const routeVisits = buildRouteVisitesWithCompany(2);
  mockFindAll("route-visit").returns({json:routeVisits});

  mockFindAll("route-plan-blueprint", 10);
  mockFindAll("route-plan", 10);
  mockFindAll("user", 10);

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
