import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  fillable,
  text,
  visitable
} = PO;

export default PO.create({
  visit: visitable('/customers'),

  companies: collection({
    itemScope: '.list-filterable-label-list .name',

    item: {
      label: text('.name')
    }
  }),

  clickAddButton: clickable('.newCustomer'),
  submitAddCustomer: clickable(".debug_modals_base-modal .submit", { resetScope: true }),

  fillCustomerName: fillable(".debug_modals_base-modal .name", { resetScope: true }),
  fillLocationCodePrefix: fillable(".debug_modals_base-modal .locationCodePrefix", { resetScope: true }),
  fillTerms: fillable(".debug_modals_base-modal .terms", { resetScope: true }),

  selectPriceTier(priceTier) {
    return selectChoose(".priceTierContainer", priceTier.get("name"));
  }
});
