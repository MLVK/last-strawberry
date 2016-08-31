import { moduleForModel, test } from "ember-qunit";

moduleForModel("route-plan-blueprint", "Unit | Model | route plan blueprint", {
  needs: [
    "model:route-plan-blueprint-slot",
    "model:user"
  ]
});

test("it exists", function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
