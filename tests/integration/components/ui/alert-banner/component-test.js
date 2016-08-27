import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("ui/alert-banner", "Integration | Component | ui/alert banner", {
  integration: true
});

test("it renders", function(assert) {

  this.render(hbs`{{ui/alert-banner}}`);

  assert.equal(this.$().text().trim(), "");

  // Template block usage:
  this.render(hbs`
    {{#ui/alert-banner}}
      template block text
    {{/ui/alert-banner}}
  `);

  assert.equal(this.$().text().trim(), "template block text");
});
