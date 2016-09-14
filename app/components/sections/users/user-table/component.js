import Ember from "ember";
import computed from "ember-computed-decorators";
import UserValidations from "last-strawberry/validators/user";

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: "col stretch",

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

  // @computed("users.@each.{name}")
  // drivers(users) {
  //
  //   const drivers = users.map(u => {
  //     return {name: u.get("name"), id: u.get("id")};
  //   });
  //
  //   // Add blank row
  //   drivers.unshiftObject({name: "Unselect driver"});
  //   return drivers;
  // },

  checkAndSaveBlueprint(changeset) {
    if(changeset.get("isValid") && changeset.get("isDirty")){
      // Get updated data
      const id = changeset.get("id");
      const name = changeset.get("name");
      const driver = this.get("users").find(u => u.id === changeset.get("user.id"));
      this.attrs.saveRoutePlanBlueprint(id, name, driver);
    }
  },

  actions: {
    setSelectedRole(changeset, role){
      // changeset.set("user", role);
      // this.checkAndSaveBlueprint(changeset);
    },

    fieldChanged(changeset, field, value) {
      changeset.set(field, value);
    },

    saveUser(changeset) {
      // this.checkAndSaveBlueprint(changeset);
    }
  }
});
