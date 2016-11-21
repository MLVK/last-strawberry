import Ember from "ember";
import computed from "ember-computed-decorators";

const { set } = Ember;
const { filterBy } = Ember.computed;
const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

export default Ember.Controller.extend({
  queryParams: ["deliveryDate", "isApproved", "isDraft", "companyQuery", "includedItems"],

  deliveryDate: tomorrow,
  isApproved: true,
  isDraft: true,
  companyQuery: "",
  includedItems: "",

  @computed("salesOrders.@each.{deliveryDate,isSalesOrder}", "deliveryDate")
  filteredSalesOrders(salesOrders, deliveryDate) {
    return salesOrders.filter(order => {
      const matchesDate = order.get("deliveryDate") === deliveryDate;
      return matchesDate && order.get("isSalesOrder");
    });
  },

  @computed("locations.@each.{active,isCustomer}", "filteredSalesOrders.[]")
  unfulfilledLocations(locations, salesOrders) {
    const fulfilledLocations = salesOrders.map(o => o.get("location").content);
    const allLocations = locations
      .filter(l => l.get("active") && l.get("isCustomer"))
      .toArray();

    return _.difference(allLocations, fulfilledLocations);
  },

  @computed("deliveryDate")
  isOldDate(deliveryDate) {
    return moment(deliveryDate).isBefore(tomorrow);
  },

  filteredItems: filterBy("items", "isSold", true),

  @computed("items.@each.{isSold,active}")
  allItems(items) {
    return items
            .filter(item => item.get("isSold") && item.get("active"))
            .sortBy("name");
  },

  actions: {
    toggleQueryParam(option, val) {
      set(this, option.queryParam, val);
    },

    onRequestNewOrder() {
      this.set("showCreateSalesOrderModal", true);
    },

    onRequestDuplicateOrders() {
      this.set("showDuplicateOrdersModal", true);
    },

    closeCreateSalesOrder() {
      this.set("showCreateSalesOrderModal", false);
    },

    closeDuplicateOrders() {
      this.set("showDuplicateOrdersModal", false);
    }
  }
});
