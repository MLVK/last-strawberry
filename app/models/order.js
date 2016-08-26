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

const { equal, alias } = Ember.computed;

const SALES_ORDER = "sales-order";
const PURCHASE_ORDER = "purchase-order";

export const PENDING_NOTIFICATION = "pending_notification";
export const PENDING_UPDATED_NOTIFICATION = "pending_updated_notification";
export const AWAITING_NOTIFICATION = "awaiting_notification";
export const AWAITING_UPDATED_NOTIFICATION = "awaiting_updated_notification";
export const NOTIFIED = "notified";

export default Model.extend(LocationHashable, {
  orderNumber:                  attr("string"),
  orderType:                    attr("string", {defaultValue: SALES_ORDER}),
  deliveryDate:                 attr("string"),
  notificationState:            attr("string", {defaultValue: PENDING_NOTIFICATION}),
  shipping:                     attr("number"),
  orderState:                   attr("string", {defaultValue: OrderState.DRAFT}),

  location:                     belongsTo("location"),
  orderItems:                   hasMany("order-item"),
  notifications:                hasMany("notification"),

  lat:                          alias("location.address.lat"),
  lng:                          alias("location.address.lng"),

  isSalesOrder:                 equal("orderType", SALES_ORDER),
  isPurchaseOrder:              equal("orderType", PURCHASE_ORDER),

  pendingNotification:          equal("notificationState", PENDING_NOTIFICATION),
  pendingUpdatedNotification:   equal("notificationState", PENDING_UPDATED_NOTIFICATION),
  awaitingNotification:         equal("notificationState", AWAITING_NOTIFICATION),
  awaitingUpdatedNotification:  equal("notificationState", AWAITING_UPDATED_NOTIFICATION),
  notified:                     equal("notificationState", NOTIFIED),

  isDraft:                      equal("orderState", OrderState.DRAFT),
  isApproved:                   equal("orderState", OrderState.APPROVED),

  @computed("orderItems.@each.{quantity}")
  empty(orderItems) {
    return orderItems.every(so => so.get("empty"));
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
