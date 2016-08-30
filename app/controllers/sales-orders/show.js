import Ember from "ember";
import computed from "ember-computed-decorators";

const { notEmpty } = Ember.computed;

export default Ember.Controller.extend({
  hasDataPath: notEmpty("dataPath"),

  @computed("items.@each.{isSold}", "model.orderItems.[]")
  filteredItems(items, orderItems) {

    return items.filter(item => {
      const matchingOrderItem = orderItems.any(oi => oi.get("item.id") === item.get("id"));

      return item.get("isSold") && !matchingOrderItem
    });
  },

  @computed("item.name", "model.location.id")
  dataPath(name, id) {
    if(name) {
      return `locations/${id}/${name}`;
    } else {
      return undefined;
    }
  },

  actions: {
    onOrderItemChange(item) {
      this.set("item", item);
    }
  }
});
