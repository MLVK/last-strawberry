import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  fillable,
  visitable,
  text,
  hasClass,
  collection
} = PO;

const page = PO.create({
  visit: visitable('/vendors/:id/locations/:location_id')
});

const visitSchedulePO = PO.create({
  visitWindows: collection({
    itemScope: '.debug_sections_locations_visit-window'
  }),

  createNewVisitWindow: clickable('.createVisitWindow')
});

const visitDaysPO = PO.create({
  dayOptions: collection({
    itemScope: '.debug_sections_locations_visit-schedule .debug_ui_label-checkbox',

    item: {
      label: text('.label'),
      enabled: hasClass('selected')
    }
  })
});

const addressPO = PO.create({
  scope: '.debug_sections_locations_address-manager',

  fillSearchAddress: fillable('input'),

  updateAddress: clickable('.submit'),

  fullAddress: text('.fullAddress')
});

export {
  page,
  visitSchedulePO,
  visitDaysPO,
  addressPO
};
