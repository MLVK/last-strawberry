import PO from 'last-strawberry/tests/page-object';

const {
  collection,
  text,
  value,
  visitable,
  clickable,
  fillable
} = PO;

const index = PO.create({

  visit: visitable('/price-tiers'),

  priceTiers: collection({
    scope: '.debug_lists_filterable-label-list',
    itemScope: '.listRow',

    item: {
      label: text('.name')
    }
  }),

  fillNewPriceTierInput: fillable('.debug_ui_input-action-bar input'),
  submitNewPriceTier: clickable('.debug_ui_input-action-bar .debug_ui_icon-button')
});

const show = PO.create({
  scope: '.priceTierContainer',
  visit: visitable('/price-tiers/:id'),
  name: value('.priceTierName input'),

  openPriceRows: collection({
    itemScope: '.openItemPricesContainer .debug_ui_price-row',

    item: {
      itemName: text('.name'),
      price: text('.price')
    }
  }),

  fulfilledPriceRows: collection({
    itemScope: '.fulfilledItemPricesContainer .debug_ui_price-row',

    item: {
      itemName: text('.name'),
      price: text('.price')
    }
  }),

  priceRows: collection({
    itemScope: '.debug_ui_price-row',

    item: {
      itemName: text('.name'),
      price: text('.price')
    }
  }),

  submitDeletePriceTier: clickable('button.buttonDelete')
});

export { index, show };
