import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("sections/companies/company-settings", "Integration | Component | sections/companies/company settings", {
  integration: true
});

test("field and update and triggers a save", function(assert) {
  assert.expect(4);
  const companyData = {name:"Silverlake", terms:10, locationCodePrefix: "AB"};
  this.set("company", companyData);

  this.set("save", () => {
    assert.ok(true);
  });
  this.set("handler", () => {});

  this.render(hbs`{{sections/companies/company-settings
                      model=company
                      updatePriceTier=handler
                      save=(action save)}}`);

  assert.equal(this.$(".name").val(), companyData.name, "Name does not render correctly");
  assert.equal(this.$(".locationCodePrefix").val(), companyData.locationCodePrefix, "Code Prefix does not render correctly");
  assert.equal(this.$(".terms").val(), companyData.terms, "terms does not render correctly");

  // Should trigger addressChanged
  this.$(".name").change();

  // Should trigger save
  this.$(".name").trigger("onblur");
});
