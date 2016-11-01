import {
  page,
  visitSchedulePO,
  visitDaysPO
} from 'last-strawberry/tests/pages/vendors-show-location';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  make,
  mockFindRecord,
  mockFindAll
} from 'ember-data-factory-guy';

let vendor,
    location;

moduleForAcceptance('Acceptance | vendors/show/location/visit-schedule', {
  beforeEach() {
    authenticateSession(this.application);

    vendor = make('company', {});
    location = make('location', {company:vendor});

    mockFindAll('company').returns({models: [vendor]});
    mockFindAll('location').returns({models: [location]});
    mockFindRecord('company').returns({model: vendor});
    mockFindRecord('location').returns({model: location});
  }
});

async function visitWithDefaults() {
  await page.visit({id:vendor.get('id'), location_id:location.get('id')});
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
