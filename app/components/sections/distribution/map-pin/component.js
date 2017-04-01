import Ember from "ember";

const { alias } = Ember.computed;

export default Ember.Component.extend({
  defaultIcon: new L.Icon.Default(),
  companyName: alias("model.address.locations.firstObject.company.name")
});
