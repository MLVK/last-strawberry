import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { hasMany } from "ember-data/relationships";

const { isPresent } = Ember;
const {
  alias,
  notEmpty
} = Ember.computed;

export default Model.extend({
  name:         attr("string"),
  companies:    hasMany("company"),
  itemPrices:   hasMany("item-price"),
  text:         alias("name"),

  priceForItem(item) {
    const match = this.get("itemPrices")
      .find(ip => ip.get("item.code") === item.get("code"));

    if(isPresent(match)) {
      return match.get("price");
    } else {
      return item.get("defaultPrice");
    }
  },

  hasCompanies: notEmpty("companies")
});
