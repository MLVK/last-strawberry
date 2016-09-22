import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  @computed("session")
  emailUniqueValidator(session) {
    return UniqueFieldValidator.create({session, type:"user", key:"email"});
  },

  @computed("emailUniqueValidator.isValid", "changeset.isValid")
  isValid(validEmail, validChangeset) {
    return validEmail && validChangeset;
  },

  actions: {
    fieldChanged(field, value) {
      const changeset = this.get("changeset");
      changeset.set(field, value);

      // Check email is unique
      if(field === "email"){
        this.get("emailUniqueValidator").check(value);
      }
    },

    submitNewUser() {
      const changeset = this.get("changeset");
      changeset.validate();
      if(this.get("isValid")){
        this.attrs.submit(changeset);
      }
    }
  }
});
