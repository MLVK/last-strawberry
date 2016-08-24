import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("ui/dd-card/dd-card-body", "Integration | Component | ui/dd card/dd card body", {
  integration: true
});

test("it renders", function(assert) {

  const content = "this is content";
  const infoIcons = ["delete", "add"]

  this.set("content", content);
  this.set("infoIcons", infoIcons);
  this.render(hbs`{{ui/dd-card/dd-card-body
    content=content
    infoIcons=infoIcons}}`);

  assert.equal(this.$(".content").text().trim(), content);
  assert.equal(this.$(".material-icons").length, infoIcons.length);
});
