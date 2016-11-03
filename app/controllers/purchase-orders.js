import Ember from "ember";
import computed from "ember-computed-decorators";

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

export default Ember.Controller.extend({
  queryParams: ["deliveryDate", "includeApproved", "includeDraft"],

  deliveryDate: tomorrow,
  includeApproved: true,
  includeDraft: true,

  @computed("orders.@each.{deliveryDate,isPurchaseOrder}", "deliveryDate")
  filteredOrders(orders, deliveryDate) {
    return orders.filter(order => {
      const matchesDate = order.get("deliveryDate") === deliveryDate;
      return matchesDate && order.get("isPurchaseOrder");
    });
  },

  @computed("deliveryDate")
  isOldDate(deliveryDate) {
    return moment(deliveryDate).isBefore(tomorrow);
  },

  @computed("locations.@each.{active,isVendor}", "filteredOrders.[]")
  unfulfilledLocations(locations, purchaseOrders) {
    const fulfilledLocations = purchaseOrders.map(o => o.get("location").content);
    const allLocations = locations
      .filter(l => l.get("active") && l.get("isVendor"))
      .toArray();

    return _.difference(allLocations, fulfilledLocations);
  },

  actions: {
    onRequestNewOrder() {
      this.set("showCreateOrderModal", true);
    },

    closeCreateOrder() {
      this.set("showCreateOrderModal", false);
    }
  }
});
