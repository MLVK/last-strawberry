import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	setupController(controller, model) {
    this._super(controller, model);

		controller.set("users", this.store.peekAll("user"));
		controller.set("routePlanBlueprints", this.store.peekAll("route-plan-blueprint"));
	},

	model(){
		return Ember.RSVP.all([
			this.store.findAll("user"),
      this.store.findAll("route-plan-blueprint")
		]);
	},

  actions: {
		saveRoutePlanBlueprint(id, name, driver) {
			const routePlanBlueprint = this.store.peekRecord("route-plan-blueprint", id);
			routePlanBlueprint.set("name", name);
			routePlanBlueprint.set("user", driver);

			routePlanBlueprint.save();
		},

		deleteRoutePlanBlueprint(routePlanBlueprint) {
			routePlanBlueprint.destroyRecord();
		}
  }
});
