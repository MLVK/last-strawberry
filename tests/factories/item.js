import FactoryGuy from "ember-data-factory-guy";
import ItemTypes from "last-strawberry/constants/item-types";

FactoryGuy.define("item", {
  default: {
    name: FactoryGuy.generate(num => `Item ${num}`),
    code: FactoryGuy.generate(num => `code-${num}`),
    description: FactoryGuy.generate(num => `Description ${num}`),
    position: FactoryGuy.generate(num => num),
    itemDesires: FactoryGuy.hasMany("item-desire")
  },

  product: {
    tag: ItemTypes.PRODUCT
  },

  ingredient: {
    tag: ItemTypes.INGREDIENT
  }
});
