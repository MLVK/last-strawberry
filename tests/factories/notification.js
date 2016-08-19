import FactoryGuy from "ember-data-factory-guy";
import NotificationState from 'last-strawberry/constants/notification-states';
import NotificationRenderer from 'last-strawberry/constants/notification-renderers';

FactoryGuy.define("notification", {
  default: {
    notificationState: NotificationState.PENDING,
    renderer: NotificationRenderer.UPDATED_SALES_ORDER
  }
});
