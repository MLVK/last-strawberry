import Ember from "ember";
import computed from "ember-computed-decorators";
import TemplateValidations from "last-strawberry/validators/route-plan-blueprint";

export default Ember.Component.extend({
  classNames: "col stretch",

  filterTerm: "",

  validators: TemplateValidations,

  @computed("routePlanBlueprints.@each.{name}", "filterTerm")
  filteredItems(routePlanBlueprints, query){
    return routePlanBlueprints
      .filter(rpb => {
        const reg = new RegExp(query, "i");
        return reg.test(rpb.get("name"));
      });
  }

});
