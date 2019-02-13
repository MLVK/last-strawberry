import Component from '@ember/component';
import { filter, gt, alias } from '@ember/object/computed';
import { computed } from 'ember-decorators/object';

export default Component.extend({
  classNames: ["card-1"],
  classNameBindings: ["isSelected:selected"],
  attributeBindings: ["data-location-hash"],

  locations: alias("model.address.locations"),
  location: alias("locations.firstObject"),
  company: alias("model.address.locations.firstObject.company"),

  addressHasMultipleLocations: gt("locations.length", 1),

  visitWindows: alias("model.address.visitWindows"),

  validVisitWindows: filter("visitWindows", function(vw){
    return vw.validForDate(this.get("date"));
  }),

  @computed("selectedRouteVisit.id", "model.id")
  isSelected() {
    const a = this.get("selectedRouteVisit.id");
    const b = this.get("model.id");
    return a === b;
  },

  validVisitWindow: alias("validVisitWindows.firstObject"),

  @computed("company.name", "locations.firstObject.id", "addressHasMultipleLocations")
  title() {
    const companyName = this.get("company.name");
    const locationId = this.get("locations.firstObject.id");
    const hasMultiple = this.get("addressHasMultipleLocations");
    return hasMultiple ? `${companyName} - Multiple` : `${companyName} - ${locationId}`;
  },

  @computed("model.{address,date}")
  visitWindow() {
    let address = this.get("model.address");
    let date = this.get("model.date");

    return address.content.visitWindowForDate(date);
  },

  @computed("model.fulfillments.[]", "company")
  infoIcons() {
    const fulfillments = this.get("model.fulfillments");
    const company = this.get("company");
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

  click() {
    this.get("selectRouteVisit")(this.get("model"));
  },

  actions: {
    removeRouteVisit() {
      if(this.get("removeRouteVisit")) {
        this.get("removeRouteVisit")(this.get("model"), this.get("model.routePlan"));
      }
    }
  }
});
