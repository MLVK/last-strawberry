import Ember from "ember";
import computed from "ember-computed-decorators";

const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

export default Ember.Controller.extend({
  queryParams: ["deliveryDate", "includeApproved", "includeDraft", "companyQuery", "includedItems"],

  deliveryDate: tomorrow,
  includeApproved: true,
  includeDraft: true,
  companyQuery: "",
  includedItems: "",

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

  @computed("items.@each.{isPurchased,active}")
  allItems(items) {
    return items
            .filter(item => item.get("isPurchased") && item.get("active"))
            .sortBy("name");
  },

  actions: {
    onRequestNewOrder() {
      this.set("showCreateOrderModal", true);
    },

    closeCreateOrder() {
      this.set("showCreateOrderModal", false);
    },

    updateIncludedItems(items) {
      const selected = items.map((item) => item.id).join(",");
      this.set("includedItems", selected);
    }
  }
});
