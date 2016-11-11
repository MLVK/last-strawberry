import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import {
  page,
  orderEditorPO
} from "last-strawberry/tests/pages/sales-orders-show";

import { page as orderPO } from "last-strawberry/tests/pages/sales-orders";

import {
  formatDate,
  formatFullDate
} from "last-strawberry/utils/date";

import {
  make,
  makeList,
  mockCreate,
  mockFindRecord,
  mockFindAll,
  mockDelete,
  mockUpdate
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | sales orders/show", {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll("item");
    mockFindAll("company");
  }
});

test("navigates to correct url", async function(assert) {
  const order = make("sales_order");
  mockFindAll("order").returns({models: [order]});
  mockFindRecord("order").returns({model: order});

  await page.visit({id:order.get("id")});

  assert.equal(currentURL(), `/sales-orders/${order.get("id")}`);
});

test("displays the correct sales order", async function(assert) {
  const location = make("location");
  const company = location.get("company");
  const deliveryDate = new Date();
  const order = make("order", {location,deliveryDate});

  mockFindAll("order").returns({models: [order]});
  mockFindRecord("order").returns({model: order});
  mockUpdate(order);

  await page.visit({id:order.get("id")});

  assert.equal(orderEditorPO.companyName, company.get("name"), "sales order company name did not match expected");
  assert.equal(orderEditorPO.locationName, `${location.get("code")} - ${location.get("name")}`, "sales order location name did not match expected");
  assert.equal(orderEditorPO.deliveryDate, formatFullDate(order.get("deliveryDate")), "sales order delivery date did not match expected");
});

test("can delete sales order", async function(assert) {
  const order = make("order");
  mockFindAll("order").returns({models: [order]});
  mockFindRecord("order").returns({model: order});

  await page.visit({id:order.get("id")});

  assert.equal(currentURL(), `/sales-orders/${order.get("id")}`);

  mockDelete("order", order.get("id"));
  await orderEditorPO.deleteOrder();

  assert.equal(currentURL(), `/sales-orders`);
});

test("can add order item manually", async function(assert) {
  const order = make("order");
  mockFindAll("order").returns({models: [order]});
  mockFindRecord("order").returns({model: order});
  mockCreate("order-item");
  const items = makeList("product", 10);

  mockFindAll("item").returns({models: items});

  await page.visit({id:order.get("id")});

  assert.equal(orderEditorPO.salesOrderItems().count, 0);

  await orderEditorPO.addProduct(items[0]);

  assert.equal(orderEditorPO.salesOrderItems().count, 1);
  assert.equal(orderEditorPO.salesOrderItems(0).name, items[0].get("name"));
});

test("adding an item manually still uses price-tier price", async function(assert) {
  const item = make("product");
  const otherItem = make("product");
  const priceTier = make("price-tier");

  make("item-price", {item, price:2.5, priceTier});
  make("item-price", {otherItem, price:3.5, priceTier});

  const company = make("company", {priceTier});
  const location = make("location", {company});
  const order = make("order", {location});

  mockFindAll("order").returns({models: [order]});
  mockFindRecord("order").returns({model: order});
  mockCreate("order-item");

  mockFindAll("item").returns({models: [item]});

  await page.visit({id:order.get("id")});

  await orderEditorPO.addProduct(item);

  assert.equal(orderEditorPO.salesOrderItems(0).total, "$2.50");
});

test("can update delivery date", async function(assert) {
  const location = make("location");
  const deliveryDate = moment().add(1,"days").toDate();
  const order = make("order", {location,deliveryDate});

  mockFindAll("order").returns({models: [order]});
  mockFindRecord("order").returns({model: order});
  mockUpdate(order);

  await page.visit({id:order.get("id")});
  assert.equal(orderPO.orders().count, 1, "show the selected order on the list");

  // Update delivery date
  const newDate = new Date(2016, 3, 28);
  await orderEditorPO.changeDeliveryDate(newDate)

  assert.equal(orderPO.orders().count, 0, "hide the selected order on the list");

  assert.equal(order.get("deliveryDate"), formatDate(newDate), "sales order delivery date did not match expected");
  assert.equal(orderEditorPO.deliveryDate, formatFullDate(newDate), "sales order delivery date did not show as expected");
});
