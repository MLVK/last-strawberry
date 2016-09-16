import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");
  this.route("items");
  this.route("customers", function() {
    this.route("show", {path:":company_id"}, function() {
      this.route("location", {path:"/locations/:location_id"});
    });
  });

  this.route("sales-orders", function() {
    this.route("show", {path:":id"});
  });

  this.route("purchase-orders", function() {
    this.route("show", {path:":id"});
  });

  this.route("distribution");

  this.route("products");

  this.route("price-tiers", function() {
    this.route("show", {path:":id"});
  });

  this.route("vendors", function() {
    this.route("show", {path:":id"}, function() {
      this.route("location", {path:"/locations/:location_id"});
    });
  });
  this.route("route-plan-blueprints");
  this.route("users");
});

export default Router;
