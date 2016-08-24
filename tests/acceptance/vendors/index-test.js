import {
  index as indexPage,
  show as showPage
} from "last-strawberry/tests/pages/vendors";

import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";

import Ember from "ember";

import {
  makeList,
  mockCreate,
  mockFindAll
} from "ember-data-factory-guy";

const { run } = Ember;

let vendors;

moduleForAcceptance("Acceptance | vendors", {
  beforeEach() {
    authenticateSession(this.application);

    vendors = makeList("company", 3);
    mockFindAll("company").returns({models: vendors});
  }
});

test("renders list of vendors", async function(assert) {
  await indexPage.visit();

  assert.equal(indexPage.vendors().count, vendors.length, "Wrong num vendors rendered");
});


test("can create new vendors", async function(assert) {
  await indexPage.visit();

  assert.equal(indexPage.vendors().count, vendors.length, "Wrong number of vendors rendered");

  const name = "Nature Well";

  run(() => mockCreate("company").match({name, isCustomer:false, isVendor:true}));

  await indexPage
    .fillNewVendor(name)
    .createNewVendor();

  assert.equal(indexPage.vendors().count, vendors.length + 1, "Wrong number of vendors rendered");
  assert.equal(showPage.name, name, "New vendor name did not match");
});
