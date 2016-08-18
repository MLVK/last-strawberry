import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import {
  make,
  makeList,
  manualSetup
} from "ember-data-factory-guy";
import { notificationsPO as page } from "last-strawberry/tests/pages/sales-orders-show";

moduleForComponent("ui/order-editor/notifications", "Integration | Component | ui/order editor/notifications", {
  integration: true,

  beforeEach: function () {
    page.setContext(this);
    manualSetup(this.container);
  },

  afterEach() {
    page.removeContext();
  }
});

test("it shows notification list when present", function(assert) {
  const notifications = makeList("notification", 3);

  this.set("notifications", notifications);

  page.render(hbs`{{ui/order-editor/notifications
                    notifications=notifications}}`);

  assert.equal(page.notifications().count, 3);
});

test("it shows id and notificationState", function(assert) {
  const notification = make("notification");

  this.set("notifications", [notification]);

  page.render(hbs`{{ui/order-editor/notifications
                    notifications=notifications}}`);

  const firstRow = page.notifications(0);

  assert.equal(firstRow.id, notification.get("id"));
  assert.equal(firstRow.notificationState, notification.get("notificationState"));
});
