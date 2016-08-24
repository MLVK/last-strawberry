import PO from "last-strawberry/tests/page-object";

const {
  clickable,
  collection,
  fillable,
  text,
  visitable,
  value
} = PO;

const index = PO.create({
  visit: visitable("/vendors"),

  fillNewVendor: fillable(".create-new-vendor.ui_input-action-bar input"),
  createNewVendor: clickable(".create-new-vendor.ui_input-action-bar .btn"),

  vendors: collection({
    itemScope: ".list-filterable-label-list .name",

    item: {
      label: text(".name")
    }
  })
});

const show = PO.create({
  visit: visitable("/vendors/:id"),
  name: value('.debug_sections_companies_company-settings .name')
});

export { index, show };
