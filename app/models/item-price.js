import Model from "ember-data/model";
import attr from "ember-data/attr";
import { belongsTo } from "ember-data/relationships";
import computed from "ember-computed-decorators";

export default Model.extend({
  price:      attr("number", {defaultValue: 0}),

  item:       belongsTo("item"),
  priceTier:  belongsTo("price-tier"),

  @computed("isNew", "item.active")
  isPending(isNew, isItemActive) {
    return isNew && isItemActive;
  },

  @computed("isNew", "item.active")
  isActive(isNew, isItemActive) {
    return !isNew && isItemActive;
  }
});
