import Ember from "ember";

export default Ember.Component.extend({
  classNames: ["col"],

  didInsertElement() {
    this.$(".body .name").focus();
  },

  actions: {
    fieldChanged(field, e) {
      this.get("changeset").set(field, e.target.value);
    },

    submitForm() {
      const changeset = this.get("changeset");
      changeset.validate();

      if(changeset.get("isValid")){
        this.attrs.submit(changeset);
      }
    }
  }
});
