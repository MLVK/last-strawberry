import Ember from "ember";

export default Ember.Component.extend({
  classNames: ["row"],

  routing: Ember.inject.service('-routing'),

  popupItems: [
    {route:"products", label:"Products"},
    {route:"items", label:"Ingredients"},
    {route:"customers", label:"Customers"},
    {route:"vendors", label:"Vendors"},
    {route:"price-tiers", label:"Price Tiers", icon:"attach_money"},
    {route:"route-plan-blueprints", label:"Route Blueprints", icon:"list"},
    {route:"users", label:"Users", icon:"supervisor_account"}
  ],

  init() {
    this._super();
    this.addListener();
  },

  addListener() {
    this.get('routing.router').on('didTransition', ::this.handleDidTransition);
  },

  updateCurrentSelectedPath(route) {
    this.set("nextRoute", route.split(".")[0]);
  },

  handleDidTransition() {
    this.updateCurrentSelectedPath(this.get('routing.currentRouteName'));
  },

  actions: {
    navigateToRoute(route) {
      this.updateCurrentSelectedPath(route);
      this.attrs.navigateToRoute(route);
    }
  }
});
