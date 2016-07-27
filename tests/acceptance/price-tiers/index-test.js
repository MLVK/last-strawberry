import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { index as page } from 'last-strawberry/tests/pages/price-tiers';

import {
  make,
  // makeList
  mockFind,
  mockFindAll
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | price tiers', {
  beforeEach() {
    authenticateSession(this.application);
  }
});

test('navigates to correct url', async function(assert) {
  mockFindAll('price-tier');

  await page.visit();

  assert.equal(currentURL(), '/price-tiers');
});

test('shows list of price tiers', async function(assert) {
  mockFindAll('price-tier', 10);

  await page.visit();

  assert.equal(page.priceTiers().count, 10);
});

test('selecting an item navigates to the price-tier show route for that item', async function(assert) {
  const priceTier = make('price-tier');

  mockFindAll('price-tier').returns({models: [priceTier]})
  mockFind('price-tier').returns({model:priceTier});

  await page
    .visit()
    .priceTiers(0)
    .click();

  assert.equal(currentURL(), '/price-tiers/1');
});
