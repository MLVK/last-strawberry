import Ember from "ember";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  @computed("model.itemPrices.@each.{isPending}")
  openItemPrices(itemPrices = []) {
    return itemPrices.filter(ip => ip.get("isPending"));
  },

  @computed("model.itemPrices.@each.{isActive}")
  fulfilledItemPrices(itemPrices = []) {
    return itemPrices.filter(ip => ip.get("isActive"));
  },

  actions: {
    onRequestDestroyPriceTier() {
      this.set("showDestroyPriceTierModal", true);
    },

    closeDestroyPriceTier() {
      this.set("showDestroyPriceTierModal", false);
    },

    destroyPriceTier(switchingPriceTier){
      this.attrs.destroyPriceTier(this.get("model"), switchingPriceTier);
      this.set("showDestroyPriceTierModal", false);
    }
  }
});
