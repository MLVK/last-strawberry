import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";

export default Model.extend({
  name: attr("string"),

  routePlanBlueprintSlots:  hasMany("route-plan-blueprint-slot"),
  user:                     belongsTo("user")
});
