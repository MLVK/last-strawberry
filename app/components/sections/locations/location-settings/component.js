import Ember from "ember";
import UniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import LocationValidations from "last-strawberry/validators/location";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["section_location_location-settings", "col"],

  validators: LocationValidations,

  @computed("session", "model.code")
  codeUniqueValidator(session, oldCode) {
    return UniqueFieldValidator.create({session, type:"location", key:"code", oldValue:oldCode});
  },

  actions: {
    fieldChanged(changeset, field, e) {
      const value = e.target.value;
      changeset.set(field, value);

      // Check code is unique
      if(field === "code"){
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
