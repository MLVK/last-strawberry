import Ember from "ember";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";
import ItemType from "last-strawberry/constants/item-types";

const {
  alias,
  equal
} = Ember.computed;

export default Model.extend({
  name:             attr("string"),
  description:      attr("string"),
  code:             attr("string"),
  unitOfMeasure:    attr("string"),
  position:         attr("number"),
  tag:              attr("string", {defaultValue: ItemType.INGREDIENT}),
  isPurchased:      attr("boolean", {defaultValue: true}),
  isSold:           attr("boolean", {defaultValue: false}),
  defaultPrice:     attr("number", {defaultValue: 0.0}),
  active:           attr("boolean", {defaultValue: true}),

  company:          belongsTo("company"),
  itemDesires:      hasMany("item-desire"),
  itemCreditRates:  hasMany("item-credit-rate"),
  itemPrices:       hasMany("item-price"),
  orderItems:       hasMany("order-item"),

  text:             alias("name"),

  isProduct:        equal("tag", ItemType.PRODUCT)
});
