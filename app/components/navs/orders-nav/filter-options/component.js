import Ember from "ember";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  isHidden:true,

  @computed("isHidden")
  title(isHidden) {
    return isHidden? "Show Filter Options": "Hide Filter Options";
  }
});
