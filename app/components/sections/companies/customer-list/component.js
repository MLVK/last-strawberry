import Ember from "ember";
import CustomerValidations from "last-strawberry/validators/customer";

export default Ember.Component.extend({
  classNames: ["col"],

  validators: CustomerValidations,

  actions: {
    onRequestNewCustomer() {
      this.set("stashedNewCustomerData", {});
      this.set("showNewCustomerModal", true);
    },

    closeNewCustomer() {
      this.set("showNewCustomerModal", false);
    },

    createNewCustomer(changeset){
      this.attrs.createNewCustomer(changeset);
      this.set("showNewCustomerModal", false);
    }
  }
});
