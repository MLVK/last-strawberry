import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";

export default Model.extend({
  notificationState:  attr("string"),
  processedAt:        attr("date"),
  renderer:           attr("string"),

  order:              belongsTo("order"),
  notificationRule:   belongsTo("notification-rule")
});
