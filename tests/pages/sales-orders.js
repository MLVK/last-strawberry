import PO from "last-strawberry/tests/page-object";

const {
  collection,
  text,
  visitable,
  clickable
} = PO;

const page = PO.create({
  visit: visitable("/sales-orders"),

  orders: collection({
    itemScope: ".debug_navs_orders-nav .child",

    item: {
      label: text(".label")
    }
  }),

  companies: collection({
    itemScope: ".debug_navs_orders-nav .parent",

    item: {
      label: text(".label")
    }
  }),

  openQuickMenu: clickable(".debug_navs_orders-nav .debug_ui_popup-menu .trigger"),

  // These should only be called after calling openQuickMenu.
  // @TODO: This needs to be updated to reset the testContainer to the body
  // items will not be found in current state
  stubOrders: clickable(".stubOrders"),
  createOrder: clickable(".createOrder"),

  toggleIncludeDraft: clickable(".includeDraft"),
  toggleIncludeApproved: clickable(".includeApproved")
});


export { page };
