import { page } from 'last-strawberry/tests/pages/customers-show-location';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  make,
  mockFind,
  mockFindAll
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | customers/show/location/visit-day');

test('renders correct url', async function(assert) {
  authenticateSession(this.application);

  const location = make('location');
  const company = await location.get('company');

  mockFindAll('company').returns({models: [company]});
  mockFind('company').returns({model: company});
  mockFind('location').returns({model: location});
  mockFindAll('location').returns({models: [location]});
  mockFindAll('item', 5);
  mockFindAll('price-tier', 1);

  await page.visit({company_id:company.get('id'), location_id:location.get('id')});

  assert.equal(currentURL(), `/customers/${company.get('id')}/locations/${location.get('id')}`);

});
