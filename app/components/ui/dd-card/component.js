import Ember from "ember";
import { style } from "last-strawberry/utils/styles";
import colors from "last-strawberry/constants/colors";

export default Ember.Component.extend({
  classNames: ["col"],
  attributeBindings:["componentStyles:style"],

  @style("colorScheme.backgroundColor")
  componentStyles(backgroundColor = colors.DARK_ORANGE) {
    return {
      "background-color": backgroundColor
    };
  }
});
