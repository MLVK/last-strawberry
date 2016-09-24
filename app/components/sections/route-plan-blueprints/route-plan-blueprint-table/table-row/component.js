import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["tableRow", "row"],

  didInsertElement() {
    this._super(...arguments);

    this.set("nameValidator", UniqueFieldValidator.create({
      session:this.get("session"),
      type:"routePlanBlueprint",
      key:"name"}));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("nameValidator").destroy();
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
    if(changeset.get("isValid") && changeset.get("isDirty") && this.get("nameValidator.isValid")){
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

    nameChanged(newValue) {
      this.get("changeset").set("name", newValue);
      this.get("nameValidator").validate(newValue, [this.get("model.name")]);
    },

    fieldChanged(field, value) {
      const changeset = this.get("changeset");
      changeset.set(field, value);
    },

    saveRoutePlanBlueprint() {
      const changeset = this.get("changeset");
      this.checkAndSaveRoutePlanBlueprint(changeset);
    }
  }
});
