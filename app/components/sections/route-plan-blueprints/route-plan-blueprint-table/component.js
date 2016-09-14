import Ember from "ember";
import computed from "ember-computed-decorators";
import TemplateValidations from "last-strawberry/validators/route-plan-blueprint";

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: "col stretch",

  filterTerm: "",

  @computed("routePlanBlueprints.@each.{name}", "filterTerm")
  filteredItems(routePlanBlueprints, query){
    return routePlanBlueprints
      .filter(rpb => {
        const reg = new RegExp(query, "i");
        return reg.test(rpb.get("name"));
      });
  },

  @computed("session")
  validators(session) {
    return TemplateValidations(session);
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
    setSelectedDriver(changeset, driver){
      changeset.set("user", driver);
      this.checkAndSaveBlueprint(changeset);
    },

    fieldChanged(changeset, field, value) {
      changeset.set(field, value);
    },

    saveRoutePlanBlueprint(changeset) {
      this.checkAndSaveBlueprint(changeset);
    }
  }
});
