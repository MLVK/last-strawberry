import Ember from "ember";
import LocationHashable from "last-strawberry/mixins/location-hashable";
import computed from "ember-computed-decorators";
import Model from "ember-data/model";
import attr from "ember-data/attr";
import {
  belongsTo,
  hasMany
} from "ember-data/relationships";
import OrderState from "last-strawberry/constants/order-states";

const {
  equal,
  alias,
  notEmpty
} = Ember.computed;

const SALES_ORDER = "sales-order";
const PURCHASE_ORDER = "purchase-order";

export default Model.extend(LocationHashable, {
  orderNumber:                  attr("string"),
  orderType:                    attr("string", {defaultValue: SALES_ORDER}),
  deliveryDate:                 attr("string"),
  shipping:                     attr("number"),
  orderState:                   attr("string", {defaultValue: OrderState.DRAFT}),
  note:                         attr("string"),

  location:                     belongsTo("location"),
  orderItems:                   hasMany("order-item"),
  notifications:                hasMany("notification"),

  lat:                          alias("location.address.lat"),
  lng:                          alias("location.address.lng"),

  isSalesOrder:                 equal("orderType", SALES_ORDER),
  isPurchaseOrder:              equal("orderType", PURCHASE_ORDER),

  isDraft:                      equal("orderState", OrderState.DRAFT),
  isApproved:                   equal("orderState", OrderState.APPROVED),

  isValid:                      notEmpty("orderItems"),

  @computed("orderItems.@each.{hasDirtyAttributes}", "hasDirtyAttributes")
  notifiable(orderItems) {
    return !orderItems.any(oi => oi.get("hasDirtyAttributes")) && !this.get('hasDirtyAttributes');
  },

  @computed("orderItems.@each.{quantity}")
  empty(orderItems) {
    return orderItems.every(oi => oi.get("empty"));
  },

  @computed("orderItems.@each.{quantity}")
  totalQuantity(orderItems) {
    return orderItems.reduce((acc, cur) => acc + Number(cur.get("quantity")), 0);
  },

  @computed("orderItems.@each.{quantity,unitPrice}", "shipping")
  totalPrice(orderItems, shipping) {
    const orderItemsTotal = orderItems.reduce((acc, cur) => acc + Number(cur.get("quantity") * cur.get("unitPrice")), 0);
    return orderItemsTotal + shipping;
  }
});
