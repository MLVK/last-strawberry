import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { make, manualSetup } from 'ember-data-factory-guy';
import decorateComponentClass from 'last-strawberry/tests/helpers/decorate-component-class';

let model;

moduleForComponent('sections/sales-order/order-editor', 'Integration | Component | sections/sales orders/order editor', {
  integration: true,

  beforeEach: function () {
    decorateComponentClass();
    manualSetup(this.container);

    model = make('order');

    this.set('model', model);
    this.set('items', []);
    this.set('updateOrderItem', () => {});
    this.set('saveOrderItem', () => {});
    this.set('deleteOrderItem', () => {});

    this.render(hbs`{{sections/sales-orders/order-editor
          updateOrderItem=(action updateOrderItem)
          saveOrderItem=(action saveOrderItem)
          deleteOrderItem=(action deleteOrderItem)
          items=items
          model=model}}`);
  }
});

test('it displays the company name', function(assert) {
  assert.equal(this.$('.locationInfo').text().trim(), `${model.get('location.id')} - ${model.get('location.name')}`);
});

test('it displays a list of order-items', function(assert) {
  assert.equal(this.$('.debug_sections_sales-orders_order-item-editor').length, model.get('orderItems.length'));
});
