import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import { show as page } from "last-strawberry/tests/pages/price-tiers";

import {
  make,
  makeList,
  mockFindRecord,
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
  mockFindRecord("price-tier").returns({model:priceTier});

  await page.visit({id:1});

  assert.equal(page.name, priceTier.get("name"));
});

test("Only shows rows for products", async function(assert) {
  makeList("item", 10);
  const products = makeList("product", 10);
  const priceTier = make("price-tier");

  mockFindAll("price-tier");
  mockFindRecord("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: products});

  await page.visit({ id: 1 });

  assert.equal(page.priceRows.length, products.length);
});

test("Shows a price row for all products", async function(assert) {
  const items = makeList("product", 10);
  const fulfilledItems = items.slice(0, 4);

  const itemPrices = fulfilledItems
    .map(item => make("item-price", { item }));

  const priceTier = make("price-tier", { itemPrices });

  mockFindAll("price-tier");
  mockFindRecord("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items});

  await page.visit({ id: 1 });

  assert.equal(page.priceRows.length, items.length);
});

test("Shows item prices for items that are not in the price tier yet", async function(assert) {
  const items = makeList("product", 10);
  const openItems = items.slice(4);
  const fulfilledItems = items.slice(0, 4);

  const itemPrices = fulfilledItems
    .map(item => make("item-price", { item }));

  const priceTier = make("price-tier", { itemPrices });

  mockFindAll("price-tier");
  mockFindRecord("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });

  await page.visit({ id: 1 });

  assert.equal(page.openPriceRows.length, openItems.length);
  assert.equal(page.fulfilledPriceRows.length, fulfilledItems.length);
});

test("Shows company list when deleting a price tier which has many companies", async function(assert) {
  const items = makeList("product", 10);

  const priceTiers = makeList("price-tier", 3);

  const priceTier = priceTiers.get("firstObject");
  const companies = makeList("company", 2, { priceTier });

  mockFindRecord("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });
  mockFindAll("price-tier").returns({ models: priceTiers});

  await page
    .visit({ id: 1 })
    .clickDeleteButton();

  assert.equal(page.companyRows.length, companies.length);
});

test("Does not show company list when deleting a price tier which has not company", async function(assert) {
  const items = makeList("product", 10);

  const priceTiers = makeList("price-tier", 3);
  const priceTier = priceTiers.get("firstObject");

  mockFindRecord("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });
  mockFindAll("price-tier").returns({ models: priceTiers});

  await page
    .visit({ id: 1 })
    .clickDeleteButton();

  assert.equal(page.companyRows.length, 0);
});

test("Remaps price tier when deleting a price tier which has many companies", async function(assert) {
  const items = makeList("product", 10);

  const priceTiers = makeList("price-tier", 3);

  const priceTier = priceTiers[0];
  const priceTierId = priceTier.get('id');

  const company = make("company", { priceTier });

  const switchingPriceTier = priceTiers[2];
  const targetPriceTierId = switchingPriceTier.get('id');

  mockFindRecord("price-tier").returns({ model: priceTier });
  mockFindAll("item").returns({ models: items });
  mockFindAll("price-tier").returns({ models: priceTiers});
  mockDelete(priceTier);
  mockUpdate('company', 1).returns({attrs: { priceTier:switchingPriceTier}});

  await page
    .visit({ id: priceTierId })
    .clickDeleteButton()
    .selectPriceTier(switchingPriceTier);

  await page.submitDeletePriceTier();

  assert.equal(company.get("priceTier.id"), targetPriceTierId);
});
