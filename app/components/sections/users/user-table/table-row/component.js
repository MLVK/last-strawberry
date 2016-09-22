import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  SUPER_ADMIN_ID: "1",

  classNames: "row",

  @computed("session", "changeset._content.email")
  emailUniqueValidator(session, oldEmail) {
    return UniqueFieldValidator.create({session, type:"user", key:"email", oldValue:oldEmail});
  },

  checkAndSaveUser(changeset){
    if(changeset.get("isValid") && changeset.get("isDirty") && this.get("emailUniqueValidator.isValid")){
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

      // Check email is unique
      if(field === "email"){
        this.get("emailUniqueValidator").check(value);
      }
    },

    saveUser(changeset) {
      this.checkAndSaveUser(changeset);
    }
  }
});
