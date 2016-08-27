import Ember from "ember";
import computed from "ember-computed-decorators";
import AddressValidations from "last-strawberry/validators/address";

export default Ember.Controller.extend({
  AddressValidations,

  @computed("items", "model.itemDesires", "model.itemCreditRates")
  itemSettings(items, itemDesires, itemCreditRates) {
    return items
      .filter(i => i.get("isProduct"))
      .map(item => {
        const itemDesire = itemDesires.find(itemDesire => itemDesire.get("item.id") === item.get("id"));
        const itemCreditRate = itemCreditRates.find(itemCreditRate => itemCreditRate.get("item.id") === item.get("id"));

        return {
          item,
          itemDesire,
          itemCreditRate
        }
      });
  },

  @computed("model.company.locations.@each.{locationHash}")
  addresses(locations) {
    return locations.map(location => location.get("address"));
  }
});
