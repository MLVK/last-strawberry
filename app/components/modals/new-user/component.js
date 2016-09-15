import Ember from "ember";

export default Ember.Component.extend({
  actions: {
    fieldChanged(field, value) {
      const changeset = this.get("changeset");
      changeset.set(field, value);
    },

    submitNewUser() {
      const changeset = this.get("changeset");
      changeset.validate();
      if(changeset.get("isValid")){
        this.attrs.submit(changeset);
      }
    }
  }
});
