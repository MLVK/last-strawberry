import PO from 'last-strawberry/tests/page-object';

const { visitable, count, value } = PO;

export default PO.create({
  visit: visitable('/customers/:id'),

  locationCount: count('.location'),

  name: value('.debug_sections_companies_company-settings .name'),
  code: value('.debug_sections_companies_company-settings .code')
});
