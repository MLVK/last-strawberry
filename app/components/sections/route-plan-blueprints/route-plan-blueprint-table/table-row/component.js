import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["tableRow", "row"],

  @computed("session", "changeset._content.name")
  nameUniqueValidator(session, oldName) {
    return UniqueFieldValidator.create({session, type:"routePlanBlueprint", key:"name", oldValue:oldName});
  },

  @computed("users.@each.{name}")
  drivers(users) {
    const drivers = users.map(u => {
      return {name: u.get("name"), id: u.get("id")};
    });

    // Add blank row
    drivers.unshiftObject({name: "Unselect driver"});
    return drivers;
  },

  checkAndSaveRoutePlanBlueprint(changeset){
    if(changeset.get("isValid") && changeset.get("isDirty") && this.get("nameUniqueValidator.isValid")){
      // Get updated data
      const id = changeset.get("id");
      const name = changeset.get("name");
      const driver = this.get("users").find(u => u.id === changeset.get("user.id"));
      this.attrs.saveRoutePlanBlueprint(id, name, driver);
    }
  },

  actions: {
    setSelectedDriver(driver){
      const changeset = this.get("changeset");
      changeset.set("user", driver);
      this.checkAndSaveRoutePlanBlueprint(changeset);
    },

    fieldChanged(field, value) {
      const changeset = this.get("changeset");
      changeset.set(field, value);

      // Check name is unique
      if(field === "name"){
        this.get("nameUniqueValidator").check(value);
      }
    },

    saveRoutePlanBlueprint() {
      const changeset = this.get("changeset");
      this.checkAndSaveRoutePlanBlueprint(changeset);
    }
  }
});
