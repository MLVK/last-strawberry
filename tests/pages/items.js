import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;

export default PO.create({
  visit: visitable('/items'),

  createNewItem: clickable('.add'),
  // deleteLastRoutePlan: clickable('.debug_section_distribution_route-plan:last-child .delete'),

  items: collection({
    itemScope: '.debug_section_items_item-editor',

    item: {
      title: text('.debug_passive_title-bar .span')
    }
  })
});
