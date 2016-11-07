import Ember from "ember";

export default Ember.Component.extend({
  classNames: ["col", "card-1"],
  isHidden:true,

  actions: {
    noteChanged(e) {
      this.set("locationNote", e.target.value);
    }
  }
});
