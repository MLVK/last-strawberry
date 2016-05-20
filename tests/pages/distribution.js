import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  collection,
  // fillable,
  text,
  visitable
} = PO;

export default PO.create({
  visit: visitable('/distribution'),

  createRoutePlan: clickable('.debug_sections_distribution_tool-bar .add'),
  deleteLastRoutePlan: clickable('.debug_sections_distribution_route-plan:last-child .delete'),

  openRouteVisits: collection({
    itemScope: '.debug_sections_distribution_open-route-visits .debug_sections_distribution_route-visit',

    item: {
      title: text('.debug_passive_title-bar .span')
    }
  }),

  routePlans: collection({
    itemScope: '.debug_sections_distribution_route-plan',

    item: {
      routeVisits: collection({
        itemScope: '.debug_sections_distribution_route-visit',
        item: {
          title: text('.title'),
          delete: clickable('.action')
        }
      })
    }
  })
});
