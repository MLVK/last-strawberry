import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  // collection,
  // fillable,
  // text,
  visitable
} = PO;

export default PO.create({
  // scope: '.main-nav',
  visitIndex: visitable('/'),
  visitOrders: visitable('/sales-orders'),
  clickHomeLink: clickable('.homeLink'),
  clickOrdersItem: clickable('.salesOrders'),
  clickPurchasesItem: clickable('.purchaseOrders'),
  clickDistributionItem: clickable('.distribution'),
  showPopUpMenu: clickable('.trigger'),
  clickProductsItem: clickable('.products',{ testContainer: 'body' })
});
