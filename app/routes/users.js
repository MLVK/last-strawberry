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

    deleteUser(user) {
      user.destroyRecord();
    },

		createNewUser(changeset) {
      const user = this.store.createRecord('user', {
        firstName: changeset.get("firstName"),
        lastName: changeset.get("lastName"),
        email: changeset.get("email"),
        role: changeset.get("role"),
        phone: changeset.get("phone"),
        password: changeset.get("password")
      });
			user.save();
    }
  }
});
