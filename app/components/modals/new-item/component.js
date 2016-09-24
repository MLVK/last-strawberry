import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["col"],

  @computed("codeValidator.isValid", "changeset.isValid")
  isValid(validCode, validChangeset) {
    return validCode && validChangeset;
  },

  didInsertElement() {
    this._super(...arguments);

    this.$(".body .name").focus();
    this.set("codeValidator", UniqueFieldValidator.create({
      session:this.get("session"),
      type:"item",
      key:"code"}));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(e) {
      const newValue = e.target.value;
      this.get("changeset").set("code", newValue);
      this.get("codeValidator").validate(newValue);
    },

    fieldChanged(field, e) {
      const value = e.target.value;
      this.get("changeset").set(field, value);
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
