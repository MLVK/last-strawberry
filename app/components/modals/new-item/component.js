import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["col"],

  @computed("session", "changeset._content.code")
  codeUniqueValidator(session, oldCode) {
    return UniqueFieldValidator.create({session, type:"item", key:"code", oldValue:oldCode});
  },

  @computed("codeUniqueValidator.isValid", "changeset.isValid")
  isValid(validCode, validChangeset) {
    return validCode && validChangeset;
  },

  didInsertElement() {
    this.$(".body .name").focus();
  },

  actions: {
    fieldChanged(field, e) {
      const value = e.target.value;
      this.get("changeset").set(field, value);

      // Check code is unique
      if(field === "code"){
        this.get("codeUniqueValidator").check(value);
      }
    },

    submitForm() {
      const changeset = this.get("changeset");
      changeset.validate();

      if(this.get("isValid")){
        this.attrs.submit(changeset);
      }
    }
  }
});
