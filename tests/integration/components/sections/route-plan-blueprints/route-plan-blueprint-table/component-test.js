import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import {
  makeList,
  manualSetup
} from "ember-data-factory-guy";

moduleForComponent("sections/route-plan-blueprints/route-plan-blueprint-table", "Integration | Component | sections/route plan blueprint/route plan blueprint table", {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test("it renders route plan blueprint list", function(assert) {

  const routePlanBlueprints = makeList("route-plan-blueprint", 10);
  const users = makeList("user", 2);
  this.set("routePlanBlueprints", routePlanBlueprints);
  this.set("users", users);

  this.set("handler", () => {});

  this.render(hbs`{{sections/route-plan-blueprints/route-plan-blueprint-table
      users=users
      routePlanBlueprints=routePlanBlueprints
      deleteRoutePlanBlueprint=handler}}`);

  assert.equal($(".tableRow").length, 10);
});
