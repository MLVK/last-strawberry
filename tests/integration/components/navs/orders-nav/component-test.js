import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import {
  makeList,
  manualSetup
} from 'ember-data-factory-guy';

moduleForComponent("navs/orders-nav", "Integration | Component | navs/companies/orders nav", {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test("it shows order list when present", function(assert) {
  assert.expect(0);

  const salesOrders = makeList('sales_order', 2);
  const items = makeList('item', 2);

  this.set("orders", salesOrders);
  this.set("items", items);
  this.set("includedItems", "");
  this.set("handler", () => {});

  this.render(hbs`{{navs/orders-nav
    orders=orders
    items=items
    includedItems=includedItems
    onDateSelected=(action handler)
    onRequestNewOrder=(action handler)
    onOrderSelected=(action handler)
    updateIncludedItems=(action handler)
  }}`);
});
