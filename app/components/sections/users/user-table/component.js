import Ember from "ember";
import computed from "ember-computed-decorators";
import UserValidations from "last-strawberry/validators/user";
import Roles from "last-strawberry/constants/roles";

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: "col stretch",

  roles: _.values(Roles),

  filterTerm: "",

  validators: UserValidations,

  @computed("users.@each.{name,email}", "filterTerm")
  filteredUsers(users, query){
    return users
      .filter(user => {
        const reg = new RegExp(query, "i");
        return reg.test(user.get("name")) || reg.test(user.get("email"));
      });
  },

  actions: {
    onRequestNewUser() {
      const stashedNewUserData = {
        role: Roles.PENDING
      }

      this.set("stashedNewUserData", stashedNewUserData);
      this.set("showNewUserModal", true);
    },

    closeNewUser() {
      this.set("showNewUserModal", false);
    },

    createNewUser(changeset){
      this.attrs.createNewUser(changeset);
      this.set("showNewUserModal", false);
    }
  }
});
