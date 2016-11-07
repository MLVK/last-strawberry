import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("sections/locations/location-settings", "Integration | Component | sections/locations/location settings", {
  integration: true
});

test("field and update and triggers a save", function(assert) {
  assert.expect(5);
  const locationData = {name:"Silverlake", deliveryRate:10, code: "AA123", note: "note content"};
  this.set("location", locationData);

  this.set("save", () => {
    assert.ok(true);
  });

  this.render(hbs`{{sections/locations/location-settings
                      model=location
                      save=(action save)}}`);

  assert.equal(this.$(".name").val(), locationData.name, "Name does not render correctly");
  assert.equal(this.$(".code").val(), locationData.code, "Code does not render correctly");
  assert.equal(this.$(".deliveryRate").val(), locationData.deliveryRate, "Delivery Rate does not render correctly");
  assert.equal(this.$(".note").val(), locationData.note, "Note does not render correctly");

  // Should trigger addressChanged
  this.$(".name").change();

  // Should trigger save
  this.$(".name").trigger("onblur");
});
