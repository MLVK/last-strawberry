import Ember from "ember";
import computed from "ember-computed-decorators";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { hasMany } from "ember-data/relationships";
import Roles from "last-strawberry/constants/roles";

const {
  alias,
  equal
} = Ember.computed;

export default Model.extend({
  firstName:    attr("string"),
  lastName:     attr("string"),
  phone:        attr("string"),
  email:        attr("string"),
  role:         attr("string", { defaultValue: Roles.PENDING }),
  password:     attr("string"),

  routePlans:             hasMany("route-plan"),
  routePlanBlueprints:    hasMany("route-plan-blueprint"),

  text: alias("name"),

  isDriver: equal("role", Roles.DRIVER),

  @computed("firstName", "lastName")
  name(first, last) {
    return `${first} ${last}`
  }
});
