import Ember from "ember";
import CompanyValidations from "last-strawberry/validators/location";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["section_location_location-settings", "col"],

  @computed("session")
  validators(session) {
    return CompanyValidations(session);
  },

  actions: {
    fieldChanged(changeset, field, e) {
      changeset.set(field, e.target.value);
    },

    save(changeset){
      if(changeset.get("isValid")){
        this.attrs.save(changeset);
      }
    }
  }
});
