import Ember from "ember";
import computed from "ember-computed-decorators";
import ItemValidators from "last-strawberry/validators/item";

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: "row",

  @computed("session")
  validators(session) {
    return ItemValidators(session);
  },

  actions: {
    updateItemField(changeset, field, value) {
      changeset.set(field, value);
    },

    saveItem(changeset) {
      if(changeset.get("isValid") && changeset.get("isDirty")){
        this.attrs.saveItem(changeset);
      }
    }
  }
});
