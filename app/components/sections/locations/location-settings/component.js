import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import LocationValidations from "last-strawberry/validators/location";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["section_location_location-settings", "col"],

  validators: LocationValidations,

  didInsertElement() {
    this._super(...arguments);

    this.set("codeValidator", UniqueFieldValidator.create({
      session:this.get("session"),
      type:"location",
      key:"code"}));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get("codeValidator").destroy();
  },

  actions: {
    codeChanged(changeset, e) {
      const newValue = e.target.value;

      changeset.set("code", newValue);
      this.get("codeValidator").validate(newValue, [this.get("model.code")]);
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
