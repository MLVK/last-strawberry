import AddressValidations from 'last-strawberry/validators/address';
import Changeset from 'ember-changeset';
import {
  addressPO as page
} from 'last-strawberry/tests/pages/customers-show-location';

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import TileLayerComponent from 'ember-leaflet/components/tile-layer';
import {
  make,
  makeList,
  manualSetup,
  mockSetup
} from 'ember-data-factory-guy';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

L.Icon.Default.imagePath = 'some-path';

let tile;
tile;

moduleForComponent('sections/locations/address-manager', 'Integration | Component | sections/locations/address manager', {
  integration: true,

  beforeEach() {
    mockSetup({logLevel: 1, responseTime: 1000, mockjaxLogLevel: 4});

    decorateComponentClass();
    page.setContext(this);
    manualSetup(this.container);

    this.register('component:tile-layer', TileLayerComponent.extend({
      init() {
        this._super(...arguments);
        tile = this;
      }
    }));
  },

  afterEach() {
    page.removeContext();
  }
});

test('it shows an address when present', function(assert) {
  const addresses = makeList('address', 5);
  const address = make('address');
  const changeset = new Changeset(address, AddressValidations);

  this.set('changeset', changeset);
  this.set('addresses', addresses);
  this.set('saveAddress', () => {});
  this.set('switchAddress', () => {});

  page.render(hbs`{{sections/locations/address-manager
    saveAddresss=saveAddresss
    switchAddress=switchAddress
    addresses=addresses
    changeset=changeset}}`);

  assert.equal(page.fullAddress, changeset.get('full'));
});

// TODO: Check back on: https://github.com/danielspaniel/ember-data-factory-guy/issues/230
// test('it triggers saveAddress when on search>save', function(assert) {
//   const addresses = makeList('address', 5);
//   const address = make('address');
//
//   this.set('address', address);
//   this.set('addresses', addresses);
//   this.set('saveAddress', () => {
//     console.log('!!!!!');
//   });
//   this.set('switchAddress', () => {});
//
//   // debugger;
//   Ember.$.mockjax(function(settings){
//     console.log({settings});
//   });
//
//   const instance = page.render(hbs`{{sections/locations/address-manager
//     saveAddresss=saveAddresss
//     switchAddress=switchAddress
//     addresses=addresses
//     value=address}}`)
//
//   instance
//     .fillSearchAddress('foo')
//     .testClick()
//     // .blurSearchAddress()
//
//
//   assert.equal(page.fullAddress, address.get('full'));
// });
