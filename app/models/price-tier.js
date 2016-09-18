import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import { hasMany } from "ember-data/relationships";

const { isPresent } = Ember;
const { alias } = Ember.computed;

export default Model.extend({
  name:         attr("string"),
  itemPrices:   hasMany("item-price"),
  text:         alias("name"),

  async priceForItem(item) {
    const match = await this.get("itemPrices")
      .find(async ip => await ip.get("item.code") === item.get("code"));

    if(isPresent(match)) {
      return match.get("price");
    } else {
      return item.get("defaultPrice");
    }
  }
});
