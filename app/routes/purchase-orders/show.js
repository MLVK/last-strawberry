import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";

import { PENDING_UPDATED_NOTIFICATION, AWAITING_NOTIFICATION, NOTIFIED } from "last-strawberry/models/order";

const INCLUDES = [
	"order-items",
	"order-items.item",
  "location",
  "location.company",
	"location.notification-rules",
	"notifications"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	setupController(controller, model) {
    this._super(controller, model);

		controller.set("items", this.store.peekAll("item"));

		const purchaseOrderController = this.controllerFor("purchase-orders");
		purchaseOrderController.set("currentSelectedOrder", model);
	},

	model(params){
    return this.store.findRecord("order", params.id, { reload:true, include:INCLUDES.join(",")});
	},

	clearPurchaseOrderController: function(){
		const purchaseOrderController = this.controllerFor("purchase-orders");
    purchaseOrderController.set("currentSelectedOrder", undefined);
  }.on("deactivate"),

	markOrderTouched() {
		const order = this.modelFor("purchase-orders.show");

		switch (order.get("notificationState")) {
			case AWAITING_NOTIFICATION:
				order.set("notificationState", PENDING_UPDATED_NOTIFICATION);
				break;
			case NOTIFIED:
				order.set("notificationState", PENDING_UPDATED_NOTIFICATION);
				break;
		}

		if(order.get("hasDirtyAttributes")) {
			return order.save();
		} else {
			return true;
		}
	},

	actions: {
		updateShipping({target: { value }}) {
			const cleaned = parseFloat(value) || 0;
			const order = this.modelFor("purchase-orders.show");
			order.set("shipping", cleaned);
		},

		saveOrder() {
			const order = this.modelFor("purchase-orders.show");
			order.save();
		},

		emailOrder(model) {
			const notificationRules = model.get("location.notificationRules");
			notificationRules.forEach(nr => {
				const notification = this.store.createRecord("notification");
				notification.set("notificationState", "pending");
				notification.set("order", model);
				notification.set("notificationRule", nr);

				notification.save();
			});
		},

		async createNewItem({company, name, code, description, unitOfMeasure, defaultPrice}) {
			const record = await this.store
				.createRecord("item", {company, name, code, description, unitOfMeasure, defaultPrice, tag:"ingredient"})
				.save();

				return record;
		},

		async createOrderItem(item) {
			const order = this.modelFor("purchase-orders.show");
			const company = await order.get("location.company");
			const unitPrice = await company.priceForItem(item);
			this.store
				.createRecord("order-item", {item, order, unitPrice})
				.save();
		},

		updateOrderItem(model, key, val) {
			model.set(key, val);
		},

		async saveOrderItem(orderItem) {
			if(orderItem.get("hasDirtyAttributes")) {
				await this.markOrderTouched();

				return orderItem
					.save()
					.catch(() => orderItem.rollbackAttributes());
			}
		},

		async deleteOrderItem(model) {
			await this.markOrderTouched();

			model.destroyRecord();
		},

		async deleteOrder(model) {
			await model.destroyRecord();

			this.transitionTo("purchase-orders");
		}
	}
});
