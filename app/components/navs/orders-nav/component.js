import Ember from "ember";
import computed from "ember-computed-decorators";

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ["col", "stretch"],

  hasStubAction: notEmpty("stubOrders"),
  includeApproved: true,
  includeDraft: true,

  @computed("orders", "query", "includeApproved", "includeDraft")
  filterOrders(orders, query, includeApproved, includeDraft){
    return orders
      .filter(order => {
        const reg = new RegExp(query, "i");

        return reg.test(order.get("location.company.name")) &&
          (includeApproved || order.get("isApproved")) &&
          (includeDraft || order.get("isDraft"));
      });
  },

  @computed("filterOrders")
  groupedOrders(orders) {
    return _
      .chain(orders)
      .sortBy(item => item.get("location.company.name"))
      .groupBy(item => item.get("location.company.name"))
      .value();
  },

  actions: {
    filterOrders(query) {
      this.set("query", query);
    },

    updateFilter(key, value){
      this.set(key, value);
    }
  }
});
