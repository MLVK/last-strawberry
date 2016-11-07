import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("sections/locations/location-note", "Integration | Component | sections/locations/location note", {
  integration: true
});

test("it renders", function(assert) {
  const noteContent = "Note sample";
  this.set("note", noteContent);
  this.set("handler", () => {});

  this.render(hbs`
    {{sections/locations/location-note
      locationNote=note
      save=handler}}
  `);

  assert.equal(this.$("textarea").val(), noteContent);
});
