import { test } from "qunit";
import moduleForAcceptance from "last-strawberry/tests/helpers/module-for-acceptance";
import { authenticateSession } from "last-strawberry/tests/helpers/ember-simple-auth";
import page from "last-strawberry/tests/pages/route-plan-blueprints";

import {
  buildList,
  makeList,
  mockQuery,
  mockDelete,
  mockFindAll
} from "ember-data-factory-guy";

moduleForAcceptance("Acceptance | route plan blueprints", {
  beforeEach() {
    authenticateSession(this.application);
    mockFindAll("user");
  }
});

test("displays route plan blueprints when present", async function(assert) {
  const routePlanBlueprints = makeList("route-plan-blueprint", 3);
  mockQuery("route-plan-blueprint").returns({ models : routePlanBlueprints });

  await page.visit();

  assert.equal(page.routePlanBlueprints().count, routePlanBlueprints.length);
});

test("displays route plan blueprint information when present", async function(assert) {
  const routePlanBlueprints = makeList("route-plan-blueprint", 3);
  mockQuery("route-plan-blueprint").returns({ models : routePlanBlueprints });

  await page.visit();

  const firstDisplayRow = page.routePlanBlueprints(0);
  const firstRow = routePlanBlueprints.get(0);

  assert.equal(firstDisplayRow.name, firstRow.get("name"));
});


test("filters route plan blueprints", async function(assert) {
  const aBlueprints = buildList("route-plan-blueprint", 2, { name: "AAA" });
  const blueprints = buildList("route-plan-blueprint", 2, { name: "BBB" });
  blueprints.data = _.union(blueprints.data, aBlueprints.data);

  mockQuery("route-plan-blueprint").returns({ json: blueprints });

  await page
    .visit()
    .fillFilterInput("aa");

  assert.equal(page.routePlanBlueprints().count, 2);
});

test("deletes route plan blueprints", async function(assert) {
  const routePlanBlueprints = makeList("route-plan-blueprint", 3);
  mockQuery("route-plan-blueprint").returns({ models : routePlanBlueprints });

  mockDelete("route-plan-blueprint");

  await page.visit();

  await page
    .routePlanBlueprints(0)
    .delete();

  assert.equal(page.routePlanBlueprints().count, routePlanBlueprints.length - 1);
});
