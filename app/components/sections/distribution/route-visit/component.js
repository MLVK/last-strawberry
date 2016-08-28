import Ember from "ember";
import computed from "ember-computed-decorators";

const { alias, gt, filter } = Ember.computed;

export default Ember.Component.extend({
  classNames: ["card-1"],
  attributeBindings: ["data-location-hash"],

  locations: alias("model.address.locations"),
  location: alias("locations.firstObject"),
  company: alias("model.address.locations.firstObject.company"),

  addressHasMultipleLocations: gt("locations.length", 1),

  visitWindows: alias("model.address.visitWindows"),

  validVisitWindows: filter("visitWindows", function(vw){
    return vw.validForDate(this.get("date"));
  }),

  validVisitWindow: alias("validVisitWindows.firstObject"),

  @computed("company.name", "locations.firstObject.id", "addressHasMultipleLocations")
  title(companyName, locationId, hasMultiple) {
    return hasMultiple ? `${companyName} - Multiple` : `${companyName} - ${locationId}`;
  },

  @computed("model.address", "model.date")
  visitWindow(address, date) {
    return address.content.visitWindowForDate(date);
  },

  @computed("model.fulfillments.[]", "company")
  infoIcons(fulfillments, company) {
    const icons = [];

    const hasMultipleFulfillments = fulfillments.get("length") > 1;
    if(hasMultipleFulfillments){
      icons.push("content_copy");
    }

    if(company.get("isVendor")){
      icons.push("local_shipping");
    }

    return icons;
  },

  actions: {
    removeRouteVisit() {
      if(this.attrs.removeRouteVisit) {
        this.attrs.removeRouteVisit(this.get("model"));
      }
    }
  }
});
