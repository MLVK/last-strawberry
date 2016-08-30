import Ember from "ember";
import computed from "ember-computed-decorators";
import downloadFile from "last-strawberry/utils/download-file";

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  pdfGenerator:   Ember.inject.service(),

  queryParams:    ["date"],
  date:           moment().add(1, "days").format("YYYY-MM-DD"),

  @computed("routePlans.@each.{date,isDeleted}", "date")
  activeRoutePlans(routePlans, date) {
    return routePlans
      .filter(rp => rp.get("date") === date)
      .filter(rp => !rp.get("isDeleted"));
  },

  activeRouteVisits: filterBy("routeVisits", "isValid", true),

  actions: {
    async printFulfillmentDocuments() {
      const { url, key } = await this.get("pdfGenerator")
        .printFulfillmentDocuments(this.get("activeRoutePlans"));
      return downloadFile(url, key);
    },

    onDateSelected(date) {
      this.set("date", moment(date).format("YYYY-MM-DD"));
    },

    selectRouteVisit(routeVisit) {
      this.set("selectedRouteVisit", routeVisit);
    }
  }
});
