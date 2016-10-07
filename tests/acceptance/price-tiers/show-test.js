import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import { show as page } from "last-strawberry/tests/pages/price-tiers";

import {
  make,
  makeList,
  mockFind,
  mockFindAll,
  mockDelete,
  mockUpdate
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | price tiers - show", {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test("Shows the name of the price tier", async function(assert) {
  const priceTier = make("price-tier");

  mockFindAll("price-tier");
  mockFindAll("item");
  mockFind("price-tier").returns({model:priceTier});

  await page.visit({id:1});

  assert.equal(page.name, priceTier.get("name"));
});

test("Only shows rows for products", async function(assert) {
  makeList("item", 10);
  const products = makeList("product", 10);
  const priceTier = make("price-tier");

  mockFindAll("price-tier");
  mockFind("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: products});

  await page.visit({ id: 1 });

  assert.equal(page.priceRows().count, products.length);
});

test("Shows a price row for all products", async function(assert) {
  const items = makeList("product", 10);
  const fulfilledItems = items.slice(0, 4);

  const itemPrices = fulfilledItems
    .map(item => make("item-price", { item }));

  const priceTier = make("price-tier", { itemPrices });

  mockFindAll("price-tier");
  mockFind("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items});

  await page.visit({ id: 1 });

  assert.equal(page.priceRows().count, items.length);
});

test("Shows item prices for items that are not in the price tier yet", async function(assert) {
  const items = makeList("product", 10);
  const openItems = items.slice(4);
  const fulfilledItems = items.slice(0, 4);

  const itemPrices = fulfilledItems
    .map(item => make("item-price", { item }));

  const priceTier = make("price-tier", { itemPrices });

  mockFindAll("price-tier");
  mockFind("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });

  await page.visit({ id: 1 });

  assert.equal(page.openPriceRows().count, openItems.length);
  assert.equal(page.fulfilledPriceRows().count, fulfilledItems.length);
});

test("Shows company list when deleting a price tier which has many companies", async function(assert) {
  const items = makeList("product", 10);

  const priceTiers = makeList("price-tier", 3);

  const priceTier = priceTiers.get("firstObject");
  const companies = makeList("company", 2, { priceTier });

  mockFind("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });
  mockFindAll("price-tier").returns({ models: priceTiers});

  await page
    .visit({ id: 1 })
    .clickDeleteButton();

  assert.equal(page.companyRows().count, companies.length);
});

test("Does not show company list when deleting a price tier which has not company", async function(assert) {
  const items = makeList("product", 10);

  const priceTiers = makeList("price-tier", 3);
  const priceTier = priceTiers.get("firstObject");

  mockFind("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });
  mockFindAll("price-tier").returns({ models: priceTiers});

  await page
    .visit({ id: 1 })
    .clickDeleteButton();

  assert.equal(page.companyRows().count, 0);
});

test("Remaps price tier when deleting a price tier which has many companies", async function(assert) {
  const items = makeList("product", 10);

  const priceTiers = makeList("price-tier", 3);

  const priceTier = priceTiers.get("firstObject");
  const company = make("company", { priceTier });

  const swichingPriceTier = priceTiers[2];

  mockFind("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });
  mockFindAll("price-tier").returns({ models: priceTiers});
  mockDelete(priceTier);
  mockUpdate(company);

  await page
    .visit({ id: 1 })
    .clickDeleteButton()
    .selectPriceTier(swichingPriceTier);

  await page.submitDeletePriceTier();

  assert.equal(company.get("priceTier.id"), swichingPriceTier.id);
});
