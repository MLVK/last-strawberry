import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("forms/elements/error-message", "Integration | Component | forms/elements/error message", {
  integration: true
});

test("it renders", function(assert) {
  // Set any properties with this.set("myProperty", "value");
  // Handle any actions with this.on("myAction", function(val) { ... });

  this.render(hbs`{{forms/elements/error-message}}`);

  assert.equal(this.$().text().trim(), "");
});
