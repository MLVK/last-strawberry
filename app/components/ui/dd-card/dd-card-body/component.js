import Ember from "ember";
import { style } from "last-strawberry/utils/styles";
import COLOR_SCHEMES from 'last-strawberry/constants/color-schemes';

export default Ember.Component.extend({
  classNames: ["row"],
  attributeBindings:["componentStyles:style"],

  @style("index")
  componentStyles(index = 0) {
    return {
      "color": COLOR_SCHEMES[index].color
    };
  }
});
