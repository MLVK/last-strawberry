import Ember from "ember";
import CompanyValidations from "last-strawberry/validators/company";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames: ["row"],

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
