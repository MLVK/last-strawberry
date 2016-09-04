import Ember from "ember";
import computed from "ember-computed-decorators";

const { and, notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ["row"],
  currentSelectedRoutePlanTemplate: undefined,

  @computed("date")
  formattedDate(date) {
    return moment(date).format("YYYY-MM-DD");
  },

  @computed("routePlans.@each.{isValid}")
  allPlansValid(routePlans = []){
    return routePlans.every(rp => rp.get("isValid"));
  },

  hasRoutePlanTemplates:          notEmpty("routePlanBlueprints"),
  hasRoutePlans:                  notEmpty('routePlans'),
  canPrintDistributionDocuments:  and("hasRoutePlans", "allPlansValid"),

  actions: {
    handleCreateRoutePlan() {
      if(!this.get("disabled")){
        this.attrs.createRoutePlan();
      }
    },

    selectRouteTemplate(template) {
      this.set("currentSelectedRoutePlanTemplate", undefined);
      this.attrs.applyTemplate(template);
    }
  }
});
