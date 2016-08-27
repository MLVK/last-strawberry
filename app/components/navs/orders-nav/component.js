import Ember from "ember";
import computed from "ember-computed-decorators";

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ["col", "stretch"],

  hasStubAction: notEmpty("stubOrders"),
  includeApproved: true,
  includeDraft: true,

  @computed("orders.@each.{orderState,isDeleted}", "query", "includeApproved", "includeDraft")
  filterOrders(orders, query, includeApproved, includeDraft){
    return orders
      .filter(order => {

        const reg = new RegExp(query, "i"),
              nameMatch = reg.test(order.get("location.company.name")),
              notDeleted = !order.get('isDeleted'),
              showApproved = includeApproved && order.get("isApproved"),
              showDraft = includeDraft && order.get("isDraft");

        return nameMatch && notDeleted && (showApproved || showDraft);
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
