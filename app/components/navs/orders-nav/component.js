import Ember from "ember";
import computed from "ember-computed-decorators";

const {
  get,
  set
} = Ember;

const {
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ["col", "stretch"],

  hasStubAction: notEmpty("stubOrders"),
  hasDuplicateAction: notEmpty("onRequestDuplicateOrders"),
  hasOrders: notEmpty("filterOrders"),

  @computed("includeApproved")
  includeApprovedBool(val) {
    return val === "true" || val === true;
  },

  @computed("includeDraft")
  includeDraftBool(val) {
    return val === "true" || val === true;
  },

  @computed("orders.@each.{orderState,isDeleted}", "query", "includeApprovedBool", "includeDraftBool")
  filterOrders(orders, query, includeApprovedBool, includeDraftBool){
    return orders
      .filter(order => {

        const reg = new RegExp(query, "i"),
              nameMatch = reg.test(order.get("location.company.name")),
              notDeleted = !order.get('isDeleted'),
              showApproved = includeApprovedBool && order.get("isApproved"),
              showDraft = includeDraftBool && order.get("isDraft");

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
    },

    toggleIncludeDraft() {
      const current = get(this, "includeDraft") === "true" || get(this, "includeDraft") === true;
      const next = !current;
      set(this, "includeDraft", next);
    },

    toggleIncludeApproved() {
      const current = get(this, "includeApproved") === "true" || get(this, "includeApproved") === true;
      const next = !current;
      set(this, "includeApproved", next);
    }
  }
});
