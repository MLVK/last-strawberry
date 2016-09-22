import Ember from "ember";
import computed from "ember-computed-decorators";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  didInsertElement() {
    this.$(".name").focus();
  },

  @computed("session", "changeset._content.name")
  nameUniqueValidator(session, oldName) {
    return UniqueFieldValidator.create({session, type:"routePlanBlueprint", key:"name", oldValue:oldName});
  },

  @computed("nameUniqueValidator.isValid", "changeset.isValid")
  isValid(validName, validChangeset) {
    return validName && validChangeset;
  },

  @computed("users.[]")
  drivers(users) {

    const drivers = users.map(u => {
      return {name: u.get("name"), id: u.get("id")};
    });

    // Add blank row
    drivers.unshiftObject({name: "Unselect driver"});
    return drivers;
  },

  actions: {
    setSelectedDriver(driver){
      this.get("changeset").set("user", driver);
    },

    fieldChanged(field, e) {
      const value = e.target.value;
      this.get("changeset").set(field, value);

      // Check name is unique
      if(field === "name"){
        this.get("nameUniqueValidator").check(value);
      }
    },

    submitForm() {
      const changeset = this.get("changeset");
      changeset.validate();
      
      if(this.get("isValid")){
        // set user for changeset
        const user = this.get("users").find(u => u.id === changeset.get("user.id"));
        changeset.set("user", user);

        this.attrs.submit(changeset);
      }
    }
  }
});
