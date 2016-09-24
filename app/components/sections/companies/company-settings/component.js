import Ember from "ember";
import CompanyValidations from "last-strawberry/validators/company";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["row"],

  validators: CompanyValidations,

  didInsertElement() {
    this._super(...arguments);

    this.set("codeValidator", UniqueFieldValidator.create({
      session:this.get("session"),
      type:"company",
      key:"location_code_prefix"}));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(changeset, e) {
      const newValue = e.target.value;
      changeset.set("locationCodePrefix", newValue);
      this.get("codeValidator").validate(newValue, [this.get("model.locationCodePrefix")]);
    },

    fieldChanged(changeset, field, e) {
      const value = e.target.value;

      changeset.set(field, value);
    },

    save(changeset){
      if(changeset.get("isValid") && this.get("codeValidator.isValid")){
        this.attrs.save(changeset);
      }
    }
  }
});
