import PO from "last-strawberry/tests/page-object";

const {
  visitable,
  isVisible
} = PO;

const page = PO.create({
  visit: visitable("/purchase-orders"),

  bannerIsVisible: isVisible(".debug_ui_alert-banner")
});


export { page };
