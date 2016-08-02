import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { show as page } from 'last-strawberry/tests/pages/price-tiers';

import {
  make,
  makeList,
  mockFind,
  mockFindAll,
  mockDelete
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | price tiers - show', {
  beforeEach() {
    authenticateSession(this.application);
    mockFindAll('price-tier');
  }
});

test('Shows the name of the price tier', async function(assert) {
  const priceTier = make('price-tier');

  mockFindAll('item');
  mockFind('price-tier').returns({model:priceTier});

  await page.visit({id:1});

  assert.equal(page.name, priceTier.get('name'));
});

test('Shows a price row for all products', async function(assert) {
  const items = makeList('item', 10);
  const fulfilledItems = items.slice(0, 4);

  const itemPrices = fulfilledItems
    .map(item => make('item-price', { item }));

  const priceTier = make('price-tier', { itemPrices });

  mockFind('price-tier').returns({ model: priceTier });
  mockFindAll('item').returns({ models: items});

  await page.visit({ id: 1 });

  assert.equal(page.priceRows().count, items.length);
});

test('Shows item prices for items that are not in the price tier yet', async function(assert) {
  const items = makeList('item', 10);
  const openItems = items.slice(4);
  const fulfilledItems = items.slice(0, 4);

  const itemPrices = fulfilledItems
    .map(item => make('item-price', { item }));

  const priceTier = make('price-tier', { itemPrices });

  mockFind('price-tier').returns({ model: priceTier });
  mockFindAll('item').returns({ models: items });

  await page.visit({ id: 1 });

  assert.equal(page.openPriceRows().count, openItems.length);
  assert.equal(page.fulfilledPriceRows().count, fulfilledItems.length);
});

test('Can delete the current price tier item', async function(assert) {
  const priceTier = make('price-tier');

  mockFindAll('item');
  mockFind('price-tier').returns({model:priceTier});
  mockDelete(priceTier);

  await page
    .visit({id:1})
    .submitDeletePriceTier();

  assert.equal(currentURL(), '/price-tiers');
});
