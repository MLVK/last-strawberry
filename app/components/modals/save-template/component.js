import Ember from "ember";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  didInsertElement() {
    this.$(".name").focus();
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
      this.get("changeset").set(field, e.target.value);
    },

    submitForm() {
      const changeset = this.get("changeset");
      changeset.validate();
      if(changeset.get("isValid")){
        // set user for changeset
        const user = this.get("users").find(u => u.id === changeset.get("user.id"));
        changeset.set("user", user);

        this.attrs.submit(changeset);
      }
    }
  }
});
