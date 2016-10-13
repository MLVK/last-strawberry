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

test("redirects to products page when clicking on Products item", async function(assert) {

  await page
    .visitIndex()
    .showPopUpMenu();

  await page.clickItem(".products");

  Ember.run.next(function(){
    assert.equal(currentURL(), "/products");
  });
});

test("redirects to items page when clicking on Items item", async function(assert) {

  await page
    .visitIndex()
    .showPopUpMenu();

  await page.clickItem(".items");

  Ember.run.next(function(){
    assert.equal(currentURL(), "/items");
  });
});

test("redirects to customers page when clicking on Customers item", async function(assert) {
  mockFindAll("price-tier");

  await page
    .visitIndex()
    .showPopUpMenu();

  await page.clickItem(".customers");

  Ember.run.next(function(){
    assert.equal(currentURL(), "/customers");
  });
});

test("redirects to vendors page when clicking on Vendors item", async function(assert) {

  await page
    .visitIndex()
    .showPopUpMenu();

  await page.clickItem(".vendors");

  Ember.run.next(function(){
    assert.equal(currentURL(), "/vendors");
  });
});

test("redirects to price tiers page when clicking on Price Tiers item", async function(assert) {
  mockFindAll("price-tier");

  await page
    .visitIndex()
    .showPopUpMenu();

  await page.clickItem(".priceTiers");

  Ember.run.next(function(){
    assert.equal(currentURL(), "/price-tiers");
  });
});

test("redirects to Route plan blueprints page when clicking on Route plan blueprints item", async function(assert) {
  mockFindAll("user");
  mockFindAll("route-plan-blueprint");

  await page
    .visitIndex()
    .showPopUpMenu();

  await page.clickItem(".routePlanBlueprints");

  Ember.run.next(function(){
    assert.equal(currentURL(), "/route-plan-blueprints");
  });
});

test("redirects to users page when clicking on Users item", async function(assert) {
  mockFindAll("user");

  await page
    .visitIndex()
    .showPopUpMenu();

  await page.clickItem(".users");

  Ember.run.next(function(){
    assert.equal(currentURL(), "/users");
  });
});
