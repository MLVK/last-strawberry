import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";
import computed from "ember-computed-decorators";
import PublishedState from "last-strawberry/constants/route-plan-states"

const {
  and,
  notEmpty
} = Ember.computed;

export default Model.extend({
  date:               attr("string"),
  publishedState:     attr("string", {defaultValue: PublishedState.PENDING}),

  user:               belongsTo("user"),
  routeVisits:        hasMany("route-visit"),

  @computed("routeVisits.@each.{position}")
  sortedRouteVisits(routeVisits) {
    return routeVisits.sortBy("position");
  },

  @computed("date")
  formattedDate(date) {
    return moment(date, "YYYY-MM-DD").format("dddd, MMM Do - YYYY");
  },

  hasUser: notEmpty("user.id"),
  hasRouteVisits: notEmpty("routeVisits"),
  isValid: and("hasUser", "hasRouteVisits")
});
