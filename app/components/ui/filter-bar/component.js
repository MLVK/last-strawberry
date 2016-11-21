import Ember from "ember";

export default Ember.Component.extend({
  classNames: ["row", "stretch"],
  actions: {
    onChange(e) {
      this.attrs.onChange(e.target.value);
    },

    clear() {
      this.set("value", "");
    }
  }
});
