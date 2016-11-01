import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("ui/dd-card/dd-card-title", "Integration | Component | ui/dd card/dd card title", {
  integration: true
});

test("it renders", function(assert) {
  this.render(hbs`{{ui/dd-card/dd-card-title}}`);
  assert.ok(true);
});
