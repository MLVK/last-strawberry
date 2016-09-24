import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  @computed("emailValidator.isValid", "changeset.isValid")
  isValid(validEmail, validChangeset) {
    return validEmail && validChangeset;
  },

  didInsertElement() {
    this._super(...arguments);

    this.set("emailValidator", UniqueFieldValidator.create({
      session:this.get("session"),
      type:"user",
      key:"email"}));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("emailValidator").destroy();
  },

  actions: {
    emailChanged(newValue) {
      this.get("changeset").set("email", newValue);
      this.get("emailValidator").validate(newValue);
    },

    fieldChanged(field, value) {
      const changeset = this.get("changeset");
      changeset.set(field, value);
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
