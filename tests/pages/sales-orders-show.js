import PO from "last-strawberry/tests/page-object";
import { openDatepicker } from "ember-pikaday/helpers/pikaday";

const {
  clickable,
  collection,
  text,
  visitable,
  value
} = PO;

const page = PO.create({
  visit: visitable("/sales-orders/:id")
});

const orderEditorPO = PO.create({
  scope: ".debug_ui_order-editor",
  locationName: text(".locationInfo"),
  companyName: text(".company"),
  deliveryDate: value(".deliveryDate"),
  salesOrderItems: collection({
    itemScope: ".debug_ui_order-editor_order-item-editor",

    item: {
      name: text(".name"),
      quantity: text(".quantity"),
      total: text(".unitPriceContainer .label")
    }
  }),

  addProduct(item) {
    return selectChoose(".addOrderItemContainer", item.get("name"));
  },

  changeDeliveryDate(date) {
    openDatepicker($("input.deliveryDate")).selectDate(date);
  },

  deleteOrder: clickable(".toolbar .delete")
});

const notificationsPO = PO.create({
  notifications: collection({
    itemScope: ".notificationRow",
    item: {
      id: text(".id"),
      notificationState: text(".notificationState"),
      renderer: text(".renderer")
    }
  })
});

export {
  page,
  orderEditorPO,
  notificationsPO
};
