import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import { page } from "last-strawberry/tests/pages/purchase-orders";

import {
  mockFindRecord,
  mockFindAll
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | purchase orders", {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll("item");
    mockFindAll("company");
  }
});

test("navigates to correct url", async function(assert) {
  mockFindAll("order");

  await page.visit();

  assert.equal(currentURL(), "/purchase-orders");
});

test("should display warning banner when deliveryDate param <= today", async function(assert) {
  mockFindAll("order");
  mockFindRecord("order");

  const deliveryDate = moment().format("YYYY-MM-DD");

  await page.visit({deliveryDate});
  assert.ok(page.bannerIsVisible);
});
