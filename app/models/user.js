import Ember from "ember";
import computed from "ember-computed-decorators";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { hasMany } from "ember-data/relationships";

const { alias } = Ember.computed;

export default Model.extend({
  firstName:    attr("string"),
  lastName:     attr("string"),
  phone:        attr("string"),
  email:        attr("string"),
  role:         attr("string", { defaultValue: "pending" }),

  routePlans:             hasMany("route-plan"),
  routePlanBlueprints:    hasMany("route-plan-blueprint"),

  text: alias("name"),

  @computed("firstName", "lastName")
  name(first, last) {
    return `${first} ${last}`
  }
});
