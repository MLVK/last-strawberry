import PO from "last-strawberry/tests/page-object";

const {
  collection,
  text,
  visitable,
  clickable,
  isVisible,
  value
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

  stubOrders: clickable(".stubOrders"),

  createOrder(){
    $(".createOrder").click();
  },

  selectLocation(location) {
    return selectChoose(".locationContainer", location.get("label"));
  },

  toggleFilterOptions: clickable(".titleBar .action"),
  toggleIncludeDraft: clickable(".includeDraft input"),
  toggleIncludeApproved: clickable(".includeApproved input"),
  inputFilterQuery: value(".filterQuery input"),
  selectFilterItem(item) {
    return selectChoose(".itemFilterContainer", item.get("name"));
  },

  bannerIsVisible: isVisible(".debug_ui_alert-banner")
});


export { page };
