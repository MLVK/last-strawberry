import Ember from "ember";
import ItemTypes from "last-strawberry/constants/item-types";

const { filterBy } = Ember.computed;

export default Ember.Controller.extend({
  ingredients: filterBy("items", "tag", ItemTypes.INGREDIENT)
});
