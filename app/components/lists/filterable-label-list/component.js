import Ember from 'ember';
import computed from "ember-computed-decorators";

const {
  get
} = Ember;

const {
  sort
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ['list-filterable-label-list', 'col', 'stretch'],
  sortName: ["text"],
  items: sort("model", "sortName"),

  @computed("items.@each.{text}", "query")
  filteredItems(items, query) {
    return items
      .filter(item => {

        const reg = new RegExp(query, "i");
        return reg.test(get(item, "text"));
      });
  },

  actions: {
    filterItems(query) {
      this.set("query", query);
    }
  }
});
