import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import { page } from "last-strawberry/tests/pages/sales-orders";

import {
  build,
  buildList,
  make,
  mockCreate,
  makeList,
  mockFindRecord,
  mockFindAll
} from "ember-data-factory-guy";

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

moduleForAcceptance("Acceptance | sales orders", {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll("item");
    mockFindAll("company");
  }
});

test("navigates to correct url", async function(assert) {
  mockFindAll("order");

  await page.visit();

  assert.equal(currentURL(), "/sales-orders");
});

test("should automatically show tomorrows orders", async function(assert) {
  mockFindAll("order", {deliveryDate: tomorrow});

  await page.visit({deliveryDate: tomorrow});

  assert.equal(currentURL(), `/sales-orders?deliveryDate=${tomorrow}`);
  assert.notOk(page.bannerIsVisible);
});

test("should display correct number of sales orders", async function(assert) {
  const salesOrders = makeList("sales_order", 5);
  mockFindAll("order").returns({models: salesOrders});

  await page.visit();

  assert.equal(page.orders().count, 5, "Wrong number of orders rendered");
});

test("should not display draft orders after uncheck Draft checkbox", async function(assert) {
  const salesOrders = makeList("sales_order", 5, "draft");
  mockFindAll("order").returns({models: salesOrders});

  await page
    .visit()
    .toggleIncludeDraft();

  assert.equal(page.orders().count, 0);
});

test("should not display approved orders after uncheck Approved checkbox", async function(assert) {
  const salesOrders = makeList("sales_order", 5, "approved");
  mockFindAll("order").returns({models: salesOrders});

  await page
    .visit()
    .toggleIncludeApproved();

  assert.equal(page.orders().count, 0);
});

test("should show sales order when location is clicked", async function(assert) {
  const salesOrder = make("sales_order");

  mockFindAll("order").returns({models: [salesOrder]});
  mockFindRecord("order").returns({model: salesOrder});

  await page
    .visit()
    .orders(0)
    .click();

  assert.equal(currentURL(), `/sales-orders/${salesOrder.get("id")}`, "URL does not match expected");
});

test("should display warning banner when deliveryDate param <= today", async function(assert) {
  mockFindAll("order");
  mockFindRecord("order");

  const deliveryDate = moment().format("YYYY-MM-DD");

  await page.visit({deliveryDate});
  assert.ok(page.bannerIsVisible);
});

test("show be able to create a new sales order from the quick menu", async function(assert) {
  const salesOrderCount = 10;
  const locations = makeList("location", 1);
  const salesOrders = buildList("sales_order", salesOrderCount);
  const salesOrder = build("sales_order", {id: 50});
  const orderId = salesOrder.get().id;

  mockFindAll("order").returns({json: salesOrders});
  mockCreate("order").returns({id:orderId});
  mockFindRecord("order").returns({json:salesOrder});

  await page
    .visit()
    .openQuickMenu();

  assert.equal(page.orders().count, salesOrderCount, "Wrong number of orders rendered");

  await page.createOrder();

  await page.selectLocation(locations.get("firstObject"));

  assert.equal(page.orders().count, salesOrderCount + 1, "Wrong number of orders rendered");
});
