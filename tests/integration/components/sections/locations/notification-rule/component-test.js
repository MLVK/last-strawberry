import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import {
  make,
  manualSetup
} from "ember-data-factory-guy";
import Changeset from "ember-changeset";
import { notificationPO as page } from "last-strawberry/tests/pages/customers-show-location";

moduleForComponent("sections/locations/notification-rule", "Integration | Component | sections/locations/notification rule", {
  integration: true,

  beforeEach: function () {
    page.setContext(this);
    manualSetup(this.container);
  },

  afterEach() {
    page.removeContext();
  }
});

test("it shows notification information when present", function(assert) {
  const notification = make("notification-rule");
  const changeset = new Changeset(notification);

  this.set("changeset", changeset);
  this.set("handler", () => {});

  page.render(hbs`{{sections/locations/notification-rule
                    changeset=changeset
                    saveNotification=handler
                    deleteNotification=handler}}`);

  assert.equal(page.firstName, changeset.get("firstName"));
  assert.equal(page.lastName, changeset.get("lastName"));
  assert.equal(page.email, changeset.get("email"));
  assert.equal(page.isWantsInvoiceChecked, changeset.get("wantsInvoice"), "wantsInvoice");
  assert.equal(page.isWantsCreditChecked, changeset.get("wantsCredit"), "wantsCredit");
});

test("it triggers saveNotification when focus out of firstName textbox", function(assert) {
  assert.expect(2);

  const notification = make("notification-rule");
  const changeset = new Changeset(notification);

  this.set("changeset", changeset);
  this.set("handler", () => {});
  this.set("saveNotification", () => {
    assert.ok(true);
  });

  const instance = page.render(hbs`{{sections/locations/notification-rule
                    changeset=changeset
                    saveNotification=saveNotification
                    deleteNotification=handler}}`);
  instance
    .fillFirstName("first name")
    .blurFirstName();
});

test("it triggers deleteNotification when click on delete button", function(assert) {
  assert.expect(1);

  const notification = make("notification-rule");
  const changeset = new Changeset(notification);

  this.set("changeset", changeset);
  this.set("handler", () => {});
  this.set("deleteNotification", () => {
    assert.ok(true);
  });

  const instance = page.render(hbs`{{sections/locations/notification-rule
                    changeset=changeset
                    saveNotification=handler
                    deleteNotification=deleteNotification}}`);
  instance.delete();
});
