import {
  page,
  itemSettingsPO
} from "last-strawberry/tests/pages/customers-show-location";
import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import {
  make,
  makeList,
  mockUpdate,
  mockFindRecord,
  mockFindAll } from "ember-data-factory-guy";

let items,
    priceTier,
    company,
    location;

moduleForAcceptance("Acceptance | customers/show/location/item-settings", {
  beforeEach() {
    authenticateSession(this.application);

    items = makeList("product", 3);
    priceTier = make("price-tier");
    company = make("company", {priceTier});
    location = make("location", {company});

    mockFindRecord("location").returns({model: location});
    mockFindRecord("company").returns({model: company});
    mockFindAll("item").returns({models: items});
    mockFindAll("company").returns({models: [company]});
    mockFindAll("priceTier").returns({models: [priceTier]});
  }
});

test("renders default item desires when no item desires are present", async function(assert) {
  await page.visit({company_id:company.get("id"), location_id:location.get("id")});

  assert.equal(itemSettingsPO.itemSettings().count, items.length, "Did not render the correct number of itemSettings");
});

test("adds enabled class to enabled items", async function(assert) {
  assert.expect(items.length);

  const itemDesires = items.map(item => make("item-desire", {item, location, enabled:true}));

  await page.visit({company_id:company.get("id"), location_id:location.get("id")});

  itemDesires.forEach((itemDesire, i) => assert.equal(itemDesire.get("enabled"), itemSettingsPO.itemSettings(i).itemDesire.enabled));
});

test("does not add enabled class to disabled items", async function(assert) {
  assert.expect(items.length);

  const itemDesires = items.map(item => make("item-desire", {item, location, enabled:false}));

  await page.visit({company_id:company.get("id"), location_id:location.get("id")});

  itemDesires.forEach((itemDesire, i) => assert.equal(itemDesire.get("enabled"), itemSettingsPO.itemSettings(i).itemDesire.enabled));
});

test("item desires toggle on click", async function(assert) {
  const itemDesires = items.map(item => make("item-desire", {item, location, enabled:true}));

  await page.visit({company_id:company.get("id"), location_id:location.get("id")});

  mockUpdate(itemDesires[0]);
  await itemSettingsPO.itemSettings(0).itemDesire.toggle();

  assert.equal(false, itemSettingsPO.itemSettings(0).itemDesire.enabled, "Didn't toggle after item click");
  assert.equal(true, itemSettingsPO.itemSettings(1).itemDesire.enabled, "Changed even though wasn't clicked");
});
