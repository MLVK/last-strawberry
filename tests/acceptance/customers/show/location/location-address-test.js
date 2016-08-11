import {

} from 'last-strawberry/tests/pages/customers-show-location';


// import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';

import {
  make,
  makeList,
  mockFind,
  // mockUpdate,
  mockFindAll
} from 'ember-data-factory-guy';

let company,
    locations;

moduleForAcceptance('Acceptance | customers/show/location/location address', {
  beforeEach() {
    authenticateSession(this.application);

    company = make('company');
    locations = makeList('location', {company}, 3);

    mockFindAll('company').returns({models: [company]});
    mockFind('company').returns({model: company});
    mockFind('location').returns({model: locations[0]});
    mockFindAll('location').returns({models: locations});
    mockFindAll('item', 5);
    mockFindAll('price-tier', 1);
  }
});

// test('can add address info to location', async function(assert) {
//   const fullAddress = '86 7th Avenue, New York City, New York 11217';
//   const location = locations[0];
//   const address = await location.get('address');
//
//   await page.visit({company_id:company.get('id'), location_id:location.get('id')})
//
//   assert.equal(addressPO.fullAddress, address.get('full'), 'Street address did not match');
//
//   mockUpdate(address);
//   mockUpdate(location);
//
//   $.mockjax({url:'https://nominatim.openstreetmap.org/search*', responseText:[{"place_id":"117327143","licence":"Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright","osm_type":"way","osm_id":"250442843","boundingbox":["40.674823","40.6749487","-73.9755668","-73.9753237"],"lat":"40.6748859","lon":"-73.9754452490037","display_name":"7th Avenue Wine and Liquor Company, 86, 7th Avenue, Park Slope, Brooklyn, Kings County, New York City, New York, 11217, United States of America","class":"building","type":"yes","importance":0.701,"address":{"building":"7th Avenue Wine and Liquor Company","house_number":"86","road":"7th Avenue","neighbourhood":"Park Slope","suburb":"Brooklyn","county":"Kings County","city":"New York City","state":"New York","postcode":"11217","country":"United States of America","country_code":"us"}}]})
//
//   await addressPO.fillSearchAddress(fullAddress);
//   debugger;
//
//   await addressPO.updateAddress();
//
//   debugger;
//
//   assert.equal(addressPO.fullAddress, fullAddress, 'Street address did not match');
// });
