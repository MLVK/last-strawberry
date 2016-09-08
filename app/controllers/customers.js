import Ember from "ember";

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  customers: filterBy("companies", "isCustomer", true)
});
