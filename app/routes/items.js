import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import ItemTypes from "last-strawberry/constants/item-types";

const MODEL_INCLUDES = [
	"company"
];

export default Route.extend(AuthenticatedRouteMixin, {
	setupController(controller, model) {
    this._super(controller, model);
		controller.set("items", this.store.peekAll("item"));
	},

	model(){
		return this.store.query("item", {
							"filter[tag]": ItemTypes.INGREDIENT,
							include:MODEL_INCLUDES.join(",")
						});
	}
});
