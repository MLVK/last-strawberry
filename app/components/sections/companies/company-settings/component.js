import Ember from "ember";
import CompanyValidations from "last-strawberry/validators/company";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["row"],

  validators: CompanyValidations,

  @computed("session", "model.locationCodePrefix")
  codeUniqueValidator(session, oldCode) {
    return UniqueFieldValidator.create({session, type:"company", key:"locationCodePrefix", oldValue:oldCode});
  },

  actions: {
    fieldChanged(changeset, field, e) {
      const value = e.target.value;

      changeset.set(field, value);

      // Check location code prefix is unique
      if(field === "locationCodePrefix"){
        this.get("codeUniqueValidator").check(value);
      }
    },

    save(changeset){
      if(changeset.get("isValid") && this.get("codeUniqueValidator.isValid")){
        this.attrs.save(changeset);
      }
    }
  }
});
