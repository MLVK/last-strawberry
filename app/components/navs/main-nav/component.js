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

  handleDidTransition() {
    const key = this.get('routing.currentRouteName');
    this.set("nextRoute", key);
  },

  actions: {
    navigateToRoute(route) {
      this.set("nextRoute", route);
      this.attrs.navigateToRoute(route);
    }
  }
});
