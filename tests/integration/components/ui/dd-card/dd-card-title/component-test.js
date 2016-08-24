import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("ui/dd-card/dd-card-title", "Integration | Component | ui/dd card/dd card title", {
  integration: true
});

test("it renders", function(assert) {
  const index = 3;
  const title = "this is title";
  const subTitle = "this is sub title";

  this.set("index", index);
  this.set("title", title);
  this.set("subTitle", subTitle);
  this.render(hbs`{{ui/dd-card/dd-card-title
    index=index
    title=title
    subTitle=subTitle}}`);

  assert.equal(this.$(".index").text().trim(), "04.");
  assert.equal(this.$(".title").text().trim(), `${title} -`);
  assert.equal(this.$(".subTitle").text().trim(), subTitle);
});
