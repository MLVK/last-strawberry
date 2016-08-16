import { moduleForModel, test } from "ember-qunit";

moduleForModel("item-desire", "Unit | Model | notification rule", {
  // Specify the other units that are required for this test.
  needs: [
    "model:location",
    "model:item"
  ]
});

test("it exists", function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
