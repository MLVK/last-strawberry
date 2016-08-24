import Ember from "ember";
import { style } from "last-strawberry/utils/styles";
import colors from "last-strawberry/constants/colors";

export default Ember.Component.extend({
  classNames: ["row"],
  attributeBindings:["componentStyles:style"],

  @style("colorScheme.color")
  componentStyles(color = colors.DARK_GREY) {
    return {
      "color": color
    };
  }
});
