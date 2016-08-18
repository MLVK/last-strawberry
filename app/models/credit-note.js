import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  hasMany,
  belongsTo
} from "ember-data/relationships";

export default Model.extend({
  xeroId:           attr("string"),
  xeroState:        attr("string"),
  creditNoteNumber: attr("string"),
  date:             attr("date"),
  submittedAt:      attr("date"),

  location:         belongsTo("location"),
  notifications:    hasMany("notification")
});
