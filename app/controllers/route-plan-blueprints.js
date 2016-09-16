import Ember from "ember";

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  drivers: filterBy("users", "isDriver", true)
});
