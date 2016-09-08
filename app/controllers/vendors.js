import Ember from "ember";

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  vendors: filterBy("companies", "isVendor", true)
});
