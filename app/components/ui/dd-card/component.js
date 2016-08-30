import Ember from "ember";
import {
  style,
  rgba
} from "last-strawberry/utils/styles";
import colors from "last-strawberry/constants/colors";

export default Ember.Component.extend({
  classNames: ["col"],
  attributeBindings:["componentStyles:style"],

  @style("colorScheme.backgroundColor", "isSelected")
  componentStyles(backgroundColor = colors.DARK_ORANGE, isSelected = false) {
    const color = isSelected ? rgba(backgroundColor, 0.8) : backgroundColor;
    return {
      "background-color": color
    };
  }
});
