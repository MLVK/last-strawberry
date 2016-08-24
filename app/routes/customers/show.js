import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

const INCLUDES = [
  "locations",
	"locations.address"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  setupController(controller, model) {
    controller.set("priceTiers", this.store.peekAll("price-tier"));
    this._super(controller, model);
  },

  model(params){
    return this.store.findRecord("company", params.company_id, { reload:true, include:INCLUDES.join(",")});
  },

  actions: {
    updatePriceTier(priceTier) {
      const company = this.modelFor("customers.show");

      company.set("priceTier", priceTier);
      company.save();
    },

    showLocation(id) {
      this.transitionTo("customers.show.location", id);
    },

    companyChanged(model, key, value) {
      model.set(key, value);
    },

    saveCompany(changeset) {
      changeset.save();
    },

    async createNewLocation() {
      const company = this.modelFor("customers.show");

      const location = this.store.createRecord("location", {company, name});
      await location.save();

      this.transitionTo("customers.show.location", location);
    }

  }
});
