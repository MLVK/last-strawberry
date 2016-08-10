import {
  page,
  visitSchedulePO,
  visitDaysPO
} from 'last-strawberry/tests/pages/customers-show-location';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  make,
  mockFind,
  mockFindAll
} from 'ember-data-factory-guy';

let company,
    location;

moduleForAcceptance('Acceptance | customers/show/location/visit-schedule', {
  beforeEach() {
    authenticateSession(this.application);

    const priceTier = make('price-tier');
    company = make('company', {priceTier});
    location = make('location', {company});

    mockFindAll('company').returns({models: [company]});
    mockFindAll('location').returns({models: [location]});
    mockFind('company').returns({model: company});
    mockFind('location').returns({model: location});
    mockFindAll('item', 5);
    mockFindAll('price-tier').returns({models: [priceTier]});
  }
});

async function visitWithDefaults() {
  await page.visit({company_id:company.get('id'), location_id:location.get('id')});
}

test('renders visit days and default visit windows no data passed in', async function(assert) {
  await visitWithDefaults();

  assert.equal(7, visitDaysPO.dayOptions().count, 'Did not render the correct number of items');
});

test('adds enabled class to enabled items', async function(assert) {
  const visitDays = [0,1,2,3,4,5,6].map(day => make('visit-day', {location, day, enabled:true}));

  await visitWithDefaults();

  visitDays.forEach((visitDay, i) => assert.equal(visitDay.get('enabled'), visitDaysPO.dayOptions(i).enabled));
});

test('clicking add visit window creates a new visit window', async function(assert) {
  await visitWithDefaults();

  assert.equal(visitSchedulePO.visitWindows().count, 0);

  await visitSchedulePO.createNewVisitWindow();

  assert.equal(visitSchedulePO.visitWindows().count, 1);
});
