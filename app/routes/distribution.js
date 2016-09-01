import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";
import { timeToMinutes } from "last-strawberry/utils/time";
import { decodePolyline } from "last-strawberry/utils/maps";

const ROUTE_VISIT_INCLUDES = [
  "route-plan",
  "fulfillments",
  "route-plan.user",
  "address",
  "address.visit-windows",
  "address.visit-windows.visit-window-days",
  "address.locations",
  "address.locations.company"
];

const ROUTE_PLAN_BLUEPRINT_INCLUDES = [
  "user",
  "route-plan-blueprint-slots",
  "route-plan-blueprint-slots.address"
];

const ROUTE_PLAN_INCLUDES = [
  "user",
  "route-visits",
  "route-visits.fulfillments",
  "route-visits.route-plan",
  "route-visits.address",
  "route-visits.address.visit-windows",
  "route-visits.address.visit-windows.visit-window-days",
  "route-visits.address.locations",
  "route-visits.address.locations.company"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  requestGenerator: Ember.inject.service(),
  session: Ember.inject.service(),

  queryParams: {
    date: {
      refreshModel: true
    }
  },

  setupController (controller, model) {
    this._super(controller, model);
    controller.set("routePlans", this.store.peekAll("route-plan"));
    controller.set("routePlanBlueprints", this.store.peekAll("route-plan-blueprint"));
    controller.set("routeVisits", this.store.peekAll("route-visit"));
    controller.set("users", this.store.peekAll("user"));

    const routePlans = this.store.peekAll("route-plan");
    routePlans.forEach(rp => {
      // Set default value for not showing error
      rp.set("polyline", decodePolyline(""));

      this.setPolyline(rp);
    });
  },

  model (params) {
    this.store.unloadAll("route-visit");
    return Ember.RSVP.all([
      this.store.query("route-plan", {"filter[date]":params.date, include:ROUTE_PLAN_INCLUDES.join(",")}),
      this.store.query("route-visit", {"filter[date]":params.date, "filter[has_route_plan]":false, include:ROUTE_VISIT_INCLUDES.join(",")}),
      this.store.query("route-plan-blueprint", {include:ROUTE_PLAN_BLUEPRINT_INCLUDES.join(",")}),
      this.store.findAll("user")
    ]);
  },

  async optimizeRoutePlan(routePlan){
    const url = `routing/optimize_route/${routePlan.get("id")}`;
    const { solution: { driver }} = await this.get("requestGenerator").getRequest(url);
    const routeVisits = await routePlan.get("routeVisits");

    routeVisits.forEach(rv => {
      const match = driver.find(d => String(d.location_id) === String(rv.get("id")));
      if(match !== undefined){
        rv.set("arriveAt", timeToMinutes(match.arrival_time));
        rv.set("departAt", timeToMinutes(match.finish_time));

        rv.save();
      }
    });
  },

  async setPolyline(routePlan){
    const hq = "-118.317191,34.1693137";
    const routeVisits = await routePlan.get("routeVisits");
    const coordinates = routeVisits
      .map(rv => [rv.get("lng"), rv.get("lat")])
      .map(coords => coords.join(","));
    const query = R.flatten([hq, coordinates, hq]).join(";");

    const apiToken = this.get("session.data.authenticated.mapbox_api_token");
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${query}?geometries=polyline&access_token=${apiToken}`;
    const result = await Ember.$.ajax({ url, type:"GET" });

    if(Ember.isPresent(result.routes)){
      routePlan.set("polyline", decodePolyline(result.routes[0].geometry));
    }
  },

  actions: {
    async saveRoutePlanBlueprint(changeset) {
      const routePlanBlueprint = await this.store
        .createRecord("route-plan-blueprint", {name: changeset.get("name"), user: changeset.get("user")})
        .save();

      const routePlan = changeset.get("routePlan");
      const routeVisits = await routePlan.get("sortedRouteVisits");

      routeVisits.forEach((rv, i) => {
        const address = rv.get("address");
        this.store
          .createRecord("route-plan-blueprint-slot", {routePlanBlueprint, position:i, address})
          .save();
      });
    },

    destroyRoutePlan(routePlan) {
      routePlan.destroyRecord();
    },

    async onRouteVisitUpdate(routeVisit, routePlan, position) {
      routeVisit.setProperties({routePlan, position});
      await routeVisit.save();

      this.setPolyline(routePlan);
      // this.optimizeRoutePlan(routePlan);
    },

    removeRouteVisit(routeVisit) {
      routeVisit.set("routePlan", null);
      routeVisit.save();
    },

    async applyTemplate(routePlanBlueprint) {
      const routePlan = await this.store
        .createRecord("route-plan", {date:this.controller.get("date"), user: routePlanBlueprint.get("user")})
        .save();

      const orphanedRouteVisits = this.store.peekAll("route-visit")
        .filter(rv => rv.get("isOpen"));

      routePlanBlueprint.get("routePlanBlueprintSlots")
        .forEach(slot => {
          const match = orphanedRouteVisits.find(rv => rv.get("address.id") === slot.get("address.id"));
          if(match) {
            match.setProperties({position:10+slot.get("position"), routePlan});
            match.save();
          }
        });

      this.setPolyline(routePlan);
    },

    updateRoutePlan(routePlan, key, val) {
      routePlan.set(key, val);
      routePlan.save();
    },

    createRoutePlan() {
      this.store
        .createRecord("route-plan", {date:this.controller.get("date")})
        .save();
    }
  }
});
