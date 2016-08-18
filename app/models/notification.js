import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";

export default Model.extend({
  notificationState:  attr("string"),
  processedAt:        attr("date"),

  order:              belongsTo("order"),
  creditNote:         belongsTo("credit-note"),
  notificationRule:   belongsTo("notification-rule")
});
