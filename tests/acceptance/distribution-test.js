import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import page from "last-strawberry/tests/pages/distribution";
import { buildRouteVisitesWithCompany } from "last-strawberry/tests/helpers/factory";
import Ember from 'ember';

import {
  buildList,
  make,
  makeList,
  mockUpdate,
  mockFindAll,
  mockCreate,
  mockQuery
} from "ember-data-factory-guy";

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

moduleForAcceptance("Acceptance | distribution", {
  beforeEach() {
    authenticateSession(this.application);
    mockFindAll("user", 1);
    mockFindAll("route-plan-blueprint");
    Ember.$.mockjax({ url: `https://api.mapbox.com*`, responseText: {}, type: 'GET' });
  }
});

test("visiting distribution defaults to tomorrows date", async function(assert) {
  mockFindAll("order");
  mockFindAll("route-plan");
  mockFindAll("route-visit");

  await page.visit({date:tomorrow});

  assert.equal(currentURL(), `/distribution?date=${tomorrow}`);
});

test("valid orphaned route-visits show up", async function(assert) {
  const routeVisits = buildRouteVisitesWithCompany(2);

  mockFindAll("route-plan");
  mockFindAll("route-visit").returns({json:routeVisits});

  await page.visit();

  assert.equal(page.openRouteVisits().count, 2);
});

test("can create new route plans", async function(assert) {
  mockFindAll("route-plan");
  mockFindAll("route-visit");
  mockCreate("route-plan")

  await page
    .visit()
    .createRoutePlan();

  assert.equal(page.routePlans().count, 1);
});

// test("can delete route plans", async function(assert) {
//   assert.expect(2);
//
//   mockFindAll("route-plan");
//   mockFindAll("route-visit", "with_route_plan");
//
//   await page.visit();
//
//   assert.equal(page.routePlans().count, 1);
//
//   mockDelete("route-plan", 1);
//   await page
//     .routePlans(0)
//     .openSettingMenu();
//
//   // @TODO: Not able to select the popup menu items since they are placed in the body
//   await page.deleteRoutePlan();
//
//   assert.equal(page.routePlans().count, 0);
// });

test("can delete individual route visit", async function(assert) {
  const company = make("company");
  const address1 = make("address");
  const address2 = make("address");
  const routePlan = make("route-plan");
  makeList("location", {company, address:address1}, {company, address:address2});

  const routeVisits = buildList("route-visit", {address:address1, routePlan}, {address:address2, routePlan});

  mockFindAll("route-plan");
  mockQuery("route-visit").returns({json:routeVisits});

  await page.visit();
  assert.equal(page.routePlans(0).routeVisits().count, 2);

  mockUpdate("route-visit", 1);

  await page.routePlans(0).routeVisits(0).delete();
  assert.equal(page.routePlans(0).routeVisits().count, 1);
});

test("deleting handled route-visit moves it to open route-visit area", async function(assert) {
  const company = make("company");
  const address = make("address");
  const routePlan = make("route-plan");
  make("location", {company, address});

  const routeVisits = buildList("route-visit", {address:address, routePlan});

  mockFindAll("route-plan");
  mockQuery("route-visit").returns({json: routeVisits});
  mockUpdate("route-visit", 1);

  await page.visit();

  assert.equal(page.openRouteVisits().count, 0);

  await page.routePlans(0).routeVisits(0).delete();

  assert.equal(page.openRouteVisits().count, 1);
});
