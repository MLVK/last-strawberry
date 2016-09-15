import Ember from "ember";
import computed from "ember-computed-decorators";
import UserValidations from "last-strawberry/validators/user";
import Roles from "last-strawberry/constants/roles";

export default Ember.Component.extend({
  session: Ember.inject.service(),
  SUPER_ADMIN_ID: "1",

  classNames: "col stretch",

  roles: _.values(Roles),

  filterTerm: "",

  @computed("users.@each.{name,email}", "filterTerm")
  filteredUsers(users, query){
    return users
      .filter(user => {
        const reg = new RegExp(query, "i");
        return reg.test(user.get("name")) || reg.test(user.get("email"));
      });
  },

  @computed("session")
  validators(session) {
    return UserValidations(session);
  },

  checkAndSaveUser(changeset){
    if(changeset.get("isValid") && changeset.get("isDirty")){
      this.attrs.saveUser(changeset);
    }
  },

  actions: {
    roleChanged(changeset, role){
      changeset.set("role", role);
      this.checkAndSaveUser(changeset);
    },

    fieldChanged(changeset, field, value) {
      changeset.set(field, value);
    },

    saveUser(changeset) {
      this.checkAndSaveUser(changeset);
    },

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
