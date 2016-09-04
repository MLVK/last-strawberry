import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";
import NotificationState from "last-strawberry/constants/notification-states";

export default Model.extend({
  notificationState:  attr("string", { defaultValue: NotificationState.PENDING }),
  processedAt:        attr("date"),
  renderer:           attr("string"),

  order:              belongsTo("order"),
  notificationRule:   belongsTo("notification-rule")
});
