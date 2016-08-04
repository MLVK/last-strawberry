import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  fillable,
  text,
  visitable,
  value
} = PO;

const index = PO.create({
  visit: visitable('/vendors'),

  fillNewVendor: fillable('.create-new-vendor.ui_input-action-bar input'),
  createNewVendor: clickable('.create-new-vendor.ui_input-action-bar .btn'),

  vendors: collection({
    itemScope: '.list-filterable-label-list .name',

    item: {
      label: text('.name')
    }
  })
});

const show = PO.create({
  visit: visitable('/vendors/:id'),
  name: value('.vendorName input')
});

export { index, show };
