import Ember from "ember";

export default Ember.Component.extend({
  classNames: ["row", "ui_input-action-bar"],

  didInsertElement() {
    if(this.get("autoFocus")){
      this.$("input").focus();
    }
  },

  actions: {
    submit() {
      const text = this.$("input").val();

      if(!Ember.isBlank(text)){
        this.attrs.submit(text.trim());
        this.$("input").val("");
      }
    }
  }
});
