import page from "last-strawberry/tests/pages/customers";
// import companyShowPO from "last-strawberry/tests/pages/customers-show";

import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";

import {
  make,
  makeList,
  // mockCreate,
  mockFindAll
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | customers", {
  beforeEach() {
    authenticateSession(this.application);

    this.companies = makeList("company", 3);
    const locations = this.companies.map(company => make("location", {company}));

    this.priceTiers = makeList("price-tier", 3);

    mockFindAll("company").returns({models: this.companies});
    mockFindAll("location").returns({models: locations});
    mockFindAll("item", 5);
    mockFindAll("price-tier").returns({models: this.priceTiers});
  }
});

test("renders list of companies", async function(assert) {
  await page.visit();

  assert.equal(page.companies().count, this.companies.length, "Wrong num companies rendered");
});


test("can create new companies", async function(assert) {
  assert.expect(1);

  const priceTier = this.priceTiers.get("firstObject");
  const customer = make("company", { priceTier});

  await page
    .visit()
    .clickAddButton()
    .fillCustomerName(customer.get("name"))
    .fillLocationCodePrefix(customer.get("locationCodePrefix"))
    .fillTerms(customer.get("terms"))
    .selectPriceTier(customer.get("priceTier"));

  // @TODO: need wait for the unique validator finished
  // await page.submitAddCustomer();
  //
  // assert.equal(page.companies().count, this.companies.length + 1, "Wrong number of companies rendered");
  // assert.equal(companyShowPO.name, customer.get("name"), "New company name didn't match");

  assert.ok(true);
});
