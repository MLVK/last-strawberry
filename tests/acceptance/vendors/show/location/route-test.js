import { page } from 'last-strawberry/tests/pages/vendors-show-location';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  make,
  mockFindRecord,
  mockFindAll
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | vendors/show/location/visit-day');

test('renders correct url', async function(assert) {
  authenticateSession(this.application);

  const location = make('location');
  const vendor = await location.get('company');

  mockFindAll('company').returns({models: [vendor]});
  mockFindRecord('company').returns({model: vendor});
  mockFindRecord('location').returns({model: location});
  mockFindAll('location').returns({models: [location]});
  // mockFindAll('item', 5);
  // mockFindAll('price-tier', 1);

  await page.visit({id:vendor.get('id'), location_id:location.get('id')});

  assert.equal(currentURL(), `/vendors/${vendor.get('id')}/locations/${location.get('id')}`);
});
