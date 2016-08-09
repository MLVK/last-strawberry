import PO from 'last-strawberry/tests/page-object';

const {
  clickable,
  fillable,
  visitable,
  text,
  value,
  hasClass,
  collection
} = PO;

const page = PO.create({
  visit: visitable('/customers/:company_id/locations/:location_id')
});

const itemSettingsPO = PO.create({
  itemSettings: collection({
    itemScope: '.debug_sections_locations_item-setting',

    item: {
      label: text('.productName'),

      itemDesire: {
        scope: '.debug_ui_toggle-button',
        enabled: hasClass('selected'),
        toggle: clickable()
      },

      itemCreditRate: {
        scope: '.debug_ui_toggle-button',
        enabled: hasClass('selected')
      }

    }
  })
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

  fullAddress: value('input')
});

export { page, itemSettingsPO, visitSchedulePO, visitDaysPO, addressPO };
