import { moduleForModel, test } from "ember-qunit";

moduleForModel("credit-note", "Unit | Model | credit note", {
  // Specify the other units that are required for this test.
  needs: [
    "model:location",
    "model:notification"
  ]
});

test("it exists", function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
