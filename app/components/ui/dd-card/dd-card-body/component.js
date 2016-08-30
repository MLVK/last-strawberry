import Ember from "ember";
import { style } from "last-strawberry/utils/styles";
import Colors from "last-strawberry/constants/colors";

export default Ember.Component.extend({
  classNames: ["row"],
  attributeBindings:["componentStyles:style"],

  @style("colorScheme")
  componentStyles(colorScheme) {
    const color = colorScheme !== undefined? colorScheme.color: Colors.DARK_GREY;
    return { color };
  }
});
