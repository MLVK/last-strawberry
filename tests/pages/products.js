import PO from "last-strawberry/tests/page-object";

const {
  clickable,
  collection,
  visitable,
  text,
  value
} = PO;

const defaultPage = PO.create({
  visit: visitable("/products"),

  products: collection({
    itemScope: ".debug_sections_items_item-table_table-row",

    item: {
      label: text(".name"),
      click: clickable()
    }
  })
});

const showPage = PO.create({
  visit: visitable("/products/:id"),

  nameValue: value(".debug_sections_products_product-editor .name input")
});

export { defaultPage, showPage };
