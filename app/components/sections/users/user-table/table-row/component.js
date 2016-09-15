import Ember from "ember";

export default Ember.Component.extend({
  SUPER_ADMIN_ID: "1",

  classNames: "row",

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
    }
  }
});
