import Ember from "ember";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);
		controller.set("users", this.store.peekAll("user"));
	},

	model(){
		return this.store.findAll("user");
	},

  actions: {
    saveUser(changeset) {
      changeset.save();
    },

    archiveUser(user) {
      // user.set("active", false);
      user.save();
    },

		createNewUser(name) {
      // const item = this.store.createRecord('item', {name, tag:ItemTypes.PRODUCT, isSold:true, isPurchased:false});
			// item.save();
    }
  }
});
