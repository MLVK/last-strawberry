import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import computed from "ember-computed-decorators";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";

const {
  alias,
  filterBy
} = Ember.computed;

export default Model.extend({
  name:                attr("string"),
  terms:               attr("number", { defaultValue: 14 }),
  isCustomer:          attr("boolean", { defaultValue: true}),
  isVendor:            attr("boolean", { defaultValue: false}),
  locationCodePrefix:  attr("string"),

  priceTier:  belongsTo("price-tier"),
  locations:  hasMany("location"),
  items:      hasMany("item"),

  text:       alias("name"),

  activeLocations: filterBy("locations", "active", true),

  async priceForItem(item) {
    const priceTier = await this.get("priceTier");

    if(Ember.isPresent(priceTier)) {
      return priceTier.priceForItem(item);
    } else {
      return item.get("defaultPrice");
    }
  },

  @computed("isCustomer", "id")
  clientUrl(isCustomer, id) {
    const routeName = isCustomer? "customers": "vendors";
    return `/${routeName}/${id}`;
  }
});
