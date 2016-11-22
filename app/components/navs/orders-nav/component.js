import Ember from "ember";
import computed from "ember-computed-decorators";

const {
  notEmpty
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ["col", "stretch"],

  hasStubAction: notEmpty("stubOrders"),
  hasDuplicateAction: notEmpty("onRequestDuplicateOrders"),
  hasOrders: notEmpty("filterOrders"),

  @computed("includedItems")
  selectedItems(includedItems) {
    const selected = [];

    const itemIdArr = includedItems.split(",");
    itemIdArr.forEach((id) => {
      const item = this.get("items").findBy("id", id);
      if(item){
        selected.push(item);
      }
    });

    return selected;
  },

  @computed("orders.@each.{isDeleted,orderItems,isVoided}", "includeDraft", "includeApproved", "companyQuery", "selectedItems")
  filterOrders(orders, includeDraft, includeApproved, query, selectedItems) {

     return orders
       .filter(order => {

         const reg = new RegExp(query, "i"),
               nameMatch = reg.test(order.get("location.company.name")),
               notDeleted = !order.get('isDeleted'),
               notVoided = !order.get('isVoided'),
               showApproved = includeApproved && order.get('isApproved'),
               showDraft = includeDraft && order.get('isDraft');

        const includedItem = Ember.isEmpty(selectedItems) ||
          selectedItems.reduce((sum,item) => sum || order.get("orderItems").isAny("item.id", item.get("id")), false);

        return nameMatch && notDeleted && notVoided && (showApproved || showDraft) && includedItem;
       });
   },

  @computed("filterOrders")
  groupedOrders(orders) {
    return _
      .chain(orders)
      .sortBy(item => item.get("location.company.name"))
      .groupBy(item => item.get("location.company.name"))
      .value();
  }
});
