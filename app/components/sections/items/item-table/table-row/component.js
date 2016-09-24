import Ember from "ember";
import ItemValidators from "last-strawberry/validators/item";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: "row",

  validators: ItemValidators,

  didInsertElement() {
    this._super(...arguments);

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
    codeChanged(changeset, newValue) {
      changeset.set("code", newValue);
      this.get("codeValidator").validate(newValue, [this.get("model.code")]);
    },

    updateItemField(changeset, field, value) {
      changeset.set(field, value);
    },

    saveItem(changeset) {
      if(changeset.get("isValid") && changeset.get("isDirty") && this.get("codeValidator.isValid")){
        this.attrs.saveItem(changeset);
      }
    }
  }
});
