import Ember from 'ember';
import colors from "last-strawberry/constants/colors";
import {
  style,
  rgba
} from "last-strawberry/utils/styles";

export default Ember.Component.extend({
    classNames: ['row'],
    attributeBindings:["componentStyles:style"],

    @style("colorScheme.backgroundColor")
    componentStyles(backgroundColor = colors.DARK_GREY) {
      return {
        "background-color": rgba(backgroundColor, 0.5)
      };
    }
});
