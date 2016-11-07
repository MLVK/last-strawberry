import FactoryGuy from "ember-data-factory-guy";
import OrderState from "last-strawberry/constants/order-states";

FactoryGuy.define("order", {
  default: {
    deliveryDate: moment().add(1, "days").format("YYYY-MM-DD"),
    location: FactoryGuy.belongsTo("location"),
    orderItems: FactoryGuy.hasMany("order-item"),
    note: "sample note content"
  },

  traits: {
    draft: {
      orderState: OrderState.DRAFT
    },

    approved: {
      orderState: OrderState.APPROVED
    }
  },

  sales_order: {
    orderType: "sales-order"
  },

  purchase_order: {
    orderType: "purchase-order"
  }
});
