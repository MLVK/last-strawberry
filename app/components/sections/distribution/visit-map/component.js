import Component from '@ember/component';
import COLOR_SCHEMES from "last-strawberry/constants/color-schemes";

export default Component.extend({
  classNames:["row", "stretch"],

  COLOR_SCHEMES,

  // Los Angeles defaults
  lat: 33.96216,
  lng: -118.31994,
  zoom: 10
});
