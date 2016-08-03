import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  // collection,
  // fillable,
  // text,
  visitable
} = PO;

export default PO.create({
  visitIndex: visitable('/'),
  visitOrders: visitable('/sales-orders'),
  clickHomeLink: clickable('.homeLink'),
  clickOrdersItem: clickable('.salesOrders'),
  clickPurchasesItem: clickable('.purchaseOrders'),
  clickDistributionItem: clickable('.distribution'),

  // fillNewCompany: fillable('.create-new-company.ui_input-action-bar input'),
  // createNewCompany: clickable('.create-new-company.ui_input-action-bar .btn'),
  //
  // companies: collection({
  //   itemScope: '.list-filterable-label-list .name',
  //
  //   item: {
  //     label: text('.name')
  //   }
  // })
});
