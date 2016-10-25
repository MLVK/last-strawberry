import PO from "last-strawberry/tests/page-object";

const {
  clickable,
  collection,
  text,
  visitable
} = PO;

const page = PO.create({
  visit: visitable("/sales-orders/:id")
});

const orderEditorPO = PO.create({
  scope: ".debug_ui_order-editor",
  locationName: text(".locationInfo"),
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
