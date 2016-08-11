import page from 'last-strawberry/tests/pages/vendors-show';
import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  makeList,
  mockFind,
  mockFindAll
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | vendors/show');

test('renders locations', function(assert) {
  authenticateSession(this.application);

  const vendors = makeList('company', 1);
  const vendor = vendors[0];
  mockFindAll('company').returns({models:vendors});
  mockFind('company').returns({model:vendor});

  const locations = makeList('location', 10, {company: vendor});

  page.visit({id:vendor.get('id')});

  andThen(function() {
    assert.equal(currentURL(), `/vendors/${vendor.get('id')}`);
    assert.equal(page.locationCount, locations.length);
    assert.equal(page.name, vendor.get('name'), 'Vendor name not rendered correctly');
  });
});
