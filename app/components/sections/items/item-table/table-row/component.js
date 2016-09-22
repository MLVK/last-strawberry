import Ember from "ember";
import computed from "ember-computed-decorators";
import ItemValidators from "last-strawberry/validators/item";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: "row",

  validators: ItemValidators,

  @computed("session", "model.code")
  codeUniqueValidator(session, oldCode) {
    return UniqueFieldValidator.create({session, type:"item", key:"code", oldValue:oldCode});
  },

  actions: {
    updateItemField(changeset, field, value) {
      changeset.set(field, value);

      // Check code is unique
      if(field === "code"){
        this.get("codeUniqueValidator").check(value);
      }
    },

    saveItem(changeset) {
      if(changeset.get("isValid") && changeset.get("isDirty") && this.get("codeUniqueValidator.isValid")){
        this.attrs.saveItem(changeset);
      }
    }
  }
});
