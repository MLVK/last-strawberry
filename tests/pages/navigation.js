import PO from "last-strawberry/tests/page-object";

const {
  clickable,
  visitable
} = PO;

export default PO.create({
  visitIndex: visitable("/"),
  visitOrders: visitable("/sales-orders"),
  clickHomeLink: clickable(".homeLink"),
  clickOrdersItem: clickable(".salesOrders"),
  clickPurchasesItem: clickable(".purchaseOrders"),
  clickDistributionItem: clickable(".distribution"),
  showPopUpMenu: clickable(".trigger"),
  clickItem(itemClass){
    $(itemClass).click();
  }
});
