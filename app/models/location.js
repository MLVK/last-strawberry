import Ember from "ember";
import LocationHashable from "last-strawberry/mixins/location-hashable";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo, hasMany } from "ember-data/relationships";
import computed from "ember-computed-decorators";

const { alias } = Ember.computed;

export default Model.extend(LocationHashable, {
  name:                 attr("string"),
  deliveryRate:         attr("number",  { defaultValue: 10 }),
  active:               attr("boolean", { defaultValue: true }),

  address:              belongsTo("address"),
  company:              belongsTo("company"),
  itemDesires:          hasMany("item-desire"),
  itemCreditRates:      hasMany("item-credit-rate"),
  orders:               hasMany("order"),
  visitDays:            hasMany("visit-day"),
  notificationRules:    hasMany("notification-rule"),

  visitWindows:         alias("address.visitWindows"),
  lat:                  alias("address.lat"),
  lng:                  alias("address.lng"),

  isCustomer:           alias("company.isCustomer"),
  isVendor:             alias("company.isVendor"),

  @computed("name", "id", "company.name")
  label(name, id, companyName) {
    return `${companyName} - ${name} - ${id}`
  }
});
