import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo, hasMany } from "ember-data/relationships";

const { alias } = Ember.computed;

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

  async priceForItem(item) {
    const priceTier = await this.get("priceTier");
    if(priceTier) {
      const itemPrices = await priceTier.get("itemPrices");
      const itemPrice = itemPrices.find(async itemPrice => await itemPrice.get("item.name") === item.get("name"));
      return itemPrice.get("price");
    } else {
      return item.get("defaultPrice")
    }
  }
});
