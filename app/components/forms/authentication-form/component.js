import Ember from 'ember';

const { bool, notEmpty } = Ember.computed;

export default Ember.Component.extend({
  hasError: notEmpty("error"),
  isLoading: bool("loading"),

  actions: {
    submit() {
      this.set("loading", true);
      this.set("error", undefined);

      this.attrs.authenticate(this.get("identification"), this.get("password"))
        .then(() => {
          this.set("loading", false);
        })
        .catch((e = { error : "Could not connect to the server."}) => {
          this.set("loading", false);
          this.set("error", e.error);
        })
    }
  }
});
