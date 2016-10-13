import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import page from "last-strawberry/tests/pages/distribution";
import {
  buildRouteVisits,
  buildRouteVisitsWithSharedRoutePlan
} from "last-strawberry/tests/factories/route-visit";
import Ember from 'ember';

import {
  mockUpdate,
  mockFindAll,
  mockCreate,
  mockQuery,
  mockDelete,
  makeList
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
  const routeVisits = buildRouteVisits(2);

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

test("can delete route plans", async function(assert) {
  assert.expect(2);
  const routePlans = makeList("route-plan", 2);

  mockFindAll("route-plan").returns({models: routePlans});
  mockQuery("route-visit");

  await page.visit();
  assert.equal(page.routePlans().count, routePlans.length);

  mockDelete(routePlans.get("firstObject"));

  await page
    .routePlans(0)
    .openSettingMenu();

  await page.deleteRoutePlan();

  assert.equal(page.routePlans().count, (routePlans.length - 1));
});

test("can delete individual route visit", async function(assert) {
  const routeVisits = buildRouteVisitsWithSharedRoutePlan(2);

  mockFindAll("route-plan");
  mockQuery("route-visit").returns({json:routeVisits});

  await page.visit();
  assert.equal(page.routePlans(0).routeVisits().count, 2);

  mockUpdate("route-visit", 1);

  await page.routePlans(0).routeVisits(0).delete();
  assert.equal(page.routePlans(0).routeVisits().count, 1);
});

test("deleting handled route-visit moves it to open route-visit area", async function(assert) {
  const routeVisits = buildRouteVisitsWithSharedRoutePlan(1);

  mockFindAll("route-plan");
  mockQuery("route-visit").returns({json: routeVisits});
  mockUpdate("route-visit", 1);

  await page.visit();

  assert.equal(page.openRouteVisits().count, 0);

  await page.routePlans(0).routeVisits(0).delete();

  assert.equal(page.openRouteVisits().count, 1);
});
