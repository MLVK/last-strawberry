import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";
import { updateModelField, saveModelIfDirty } from "last-strawberry/actions/model-actions";
import { PRODUCT } from "last-strawberry/constants/item-types";

const MODEL_INCLUDES = [
  "item-prices",
  "item-prices.item",
  "item-prices.price-tier",
  "item-prices.item.item-prices"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, priceTier) {
    const fulfilledItems = priceTier.get("itemPrices")
      .map(ip => ip.get("item").content);

    const allItems = this.store.peekAll("item")
      .filter(i => i.get("isProduct"))
      .toArray();

    const openItems = _.difference(allItems, fulfilledItems);

    openItems.forEach(item =>
      this.store.createRecord("item-price", {priceTier, item}));

    this._super(controller, priceTier);

    controller.set("priceTiers", this.store.peekAll("price-tier"));
  },

  model(params) {
    return Ember.RSVP.all([
      this.store.query("item", {"filter[tag]":PRODUCT})
    ])
    .then(() => {
      return this.store.findRecord("price-tier", params.id, { reload: true, include:MODEL_INCLUDES.join(",") });
    });
  },

  actions: {
    updateModelField,
    saveModelIfDirty,

    async destroyPriceTier(model, switchingPriceTier) {
      // Switching companies to a new price tier
      model.get("companies").toArray().forEach(async company => {
        company.set("priceTier", switchingPriceTier);
        await company.save();
      });

      await model.destroyRecord();
      this.transitionTo("price-tiers");
    }
  }
});
