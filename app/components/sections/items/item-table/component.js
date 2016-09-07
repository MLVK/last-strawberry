import Ember from "ember";
import computed from "ember-computed-decorators";

export default Ember.Component.extend({
  classNames: "col stretch",

  showInactive: false,
  filterTerm: "",

  @computed("items.@each.{active,name,code}", "filterTerm", "showInactive")
  filteredItems(items, query, showInactive){
    return items
      .sortBy("description")
      .filter(item => item.get("active") || showInactive)
      .filter(item => {
        const reg = new RegExp(query, "i");
        return reg.test(item.get("name")) || reg.test(item.get("code")) || reg.test(item.get("company.name"));
      });
  }
});
