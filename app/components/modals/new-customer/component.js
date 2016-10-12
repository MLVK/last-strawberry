import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  @computed("codeValidator.isValid", "changeset.isValid")
  isValid(validCode, validChangeset) {
    return validCode && validChangeset;
  },

  didInsertElement() {
    this.set("codeValidator", UniqueFieldValidator.create({
      session:this.get("session"),
      type:"company",
      key:"location_code_prefix"}));
  },

  willDestroyElement() {
    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(newValue) {
      this.get("changeset").set("locationCodePrefix", newValue);
      this.get("codeValidator").validate(newValue);
    },

    fieldChanged(field, value) {
      this.get("changeset").set(field, value);
    },

    submitNewCustomer() {
      const changeset = this.get("changeset");
      changeset.validate();
      if(this.get("isValid")){
        this.attrs.submit(changeset);
      }
    }
  }
});
