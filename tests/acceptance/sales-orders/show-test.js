import { test } from 'qunit';
import moduleForAcceptance from 'last-strawberry/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'last-strawberry/tests/helpers/ember-simple-auth';
import { page, orderEditorPO } from 'last-strawberry/tests/pages/sales-orders-show';

import {
  make,
  mockFind,
  mockFindAll,
  mockDelete
} from 'ember-data-factory-guy';

moduleForAcceptance('Acceptance | sales orders/show', {
  beforeEach() {
    authenticateSession(this.application);

    mockFindAll('item');
    mockFindAll('company');
  }
});

test('navigates to correct url', async function(assert) {
  const order = make('sales_order');
  mockFindAll('order').returns({models: [order]});
  mockFind('order').returns({model: order});

  await page.visit({id:order.get('id')});

  assert.equal(currentURL(), `/sales-orders/${order.get('id')}`);
});

test('displays the correct sales order', async function(assert) {
  const location = make('location');
  const order = make('order', {location});
  mockFindAll('order').returns({models: [order]});
  mockFind('order').returns({model: order});

  await page.visit({id:order.get('id')});

  assert.equal(orderEditorPO.locationName, `${location.get('id')} - ${location.get('name')}`, 'sales order location name did not match expected');
});

test('can delete sales order', async function(assert) {
  const order = make('order');
  mockFindAll('order').returns({models: [order]});
  mockFind('order').returns({model: order});

  await page.visit({id:order.get('id')});

  assert.equal(currentURL(), `/sales-orders/${order.get('id')}`);

  mockDelete('order', order.get('id'));
  await orderEditorPO.deleteOrder();

  assert.equal(currentURL(), `/sales-orders`);
});
