import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import {
  makeList,
  manualSetup
} from "ember-data-factory-guy";

moduleForComponent("sections/companies/customer-list", "Integration | Component | sections/companies/customer list", {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test("it renders", function(assert) {
  const customers = makeList("company", 2);

  this.set("customers", customers);
  this.set("handler", () => {});

  this.render(hbs`{{sections/companies/customer-list
    customers=customers
    showCustomer=(action handler)
    createNewCustomer=(action handler)
  }}`);

  assert.equal(this.$(".listRow").length, customers.length);
});
