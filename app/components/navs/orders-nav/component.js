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

  @computed("isApproved", "isDraft")
  toggleOptions(isApproved, isDraft) {
    return [
      {
        text: "Drafts",
        queryParam: "isDraft",
        selected: isDraft
      },
      {
        text: "Approved",
        queryParam: "isApproved",
        selected: isApproved
      }
    ];
  },

  includedItems: "",

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

  @computed("orders.@each.{isDeleted,orderItems,isVoided}", "toggleOptions.@each.{selected}", "companyQuery", "selectedItems")
  filterOrders(orders, toggleOptions, query, selectedItems) {
     return orders
       .filter(order => {

         const reg = new RegExp(query, "i"),
               nameMatch = reg.test(order.get("location.company.name")),
               notDeleted = !order.get('isDeleted'),
               notVoided = !order.get('isVoided');

        const toggle = toggleOptions.reduce((sum,item) => sum || (item.selected && order.get(item.queryParam)), false);

        const includedItem = Ember.isEmpty(selectedItems) ||
          selectedItems.reduce((sum,item) => sum || order.get("orderItems").isAny("item.id", item.get("id")), false);

        return nameMatch && notDeleted && notVoided && toggle && includedItem;
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
    // toggled(option){
    //   this.set(option.value, option.selected);
    // },

    // itemSelected(items){
    //   const selected = items.map((item) => item.id).join(",");
    //   this.set("includedItems", selected);
    // }
  }
});
