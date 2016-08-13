import page from 'last-strawberry/tests/pages/customers';
import companyShowPO from 'last-strawberry/tests/pages/customers-show';

import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import Ember from 'ember';

import {
  make,
  makeList,
  mockCreate,
  mockFindAll
} from 'ember-data-factory-guy';

const { run } = Ember;

let companies,
    locations;

moduleForAcceptance('Acceptance | customers', {
  beforeEach() {
    authenticateSession(this.application);

    companies = makeList('company', 3);
    locations = companies.map(company => make('location', {company}));

    mockFindAll('company').returns({models: companies});
    mockFindAll('location').returns({models: locations});
    mockFindAll('item', 5);
    mockFindAll('price-tier', 1);
  }
});

test('renders list of companies', async function(assert) {
  await page.visit();
  
  assert.equal(page.companies().count, companies.length, 'Wrong num companies rendered');
});


test('can create new companies', async function(assert) {
  await page.visit();

  assert.equal(page.companies().count, companies.length, "Wrong number of companies rendered");

  const name = 'Nature Well';

  run(() => mockCreate('company').match({name}));

  await page
    .fillNewCompany(name)
    .createNewCompany();

  assert.equal(page.companies().count, companies.length + 1, "Wrong number of companies rendered");
  assert.equal(companyShowPO.name, name, "New company name didn't match");
});
