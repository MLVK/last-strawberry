import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";
import NotificationState from 'last-strawberry/constants/notification-states';
import NotificationRenderer from 'last-strawberry/constants/notification-renderers';
import OrderState from "last-strawberry/constants/order-states";

const INCLUDES = [
	"order-items",
	"order-items.item",
  "location",
  "location.company",
  "location.item-desires",
  "location.item-desires.item",
	"location.notification-rules",
	"notifications"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	setupController(controller, model) {
    this._super(controller, model);

		const salesOrderController = this.controllerFor("sales-orders");
		salesOrderController.set("currentSelectedOrder", model);

		controller.set("items", this.store.peekAll("item"));
		controller.set("salesOrders", salesOrderController.get("filteredSalesOrders"));
	},

	model(params){
    return this.store.findRecord("order", params.id, { reload:true, include:INCLUDES.join(",")});
	},

	clearSalesOrderController: function(){
		const salesOrderController = this.controllerFor("sales-orders");
    salesOrderController.set("currentSelectedOrder", undefined);
  }.on("deactivate"),

	actions: {
		updateShipping({target: { value }}) {
			const cleaned = parseFloat(value) || 0;
			const order = this.modelFor("sales-orders.show");
			order.set("shipping", cleaned);
		},

		saveOrder() {
			const order = this.modelFor("sales-orders.show");
			order.save();
		},

		async createOrderItem(item) {
			const order = this.modelFor("sales-orders.show");
			const company = await order.get("location.company");

			const unitPrice = await company.priceForItem(item);
			this.store
				.createRecord("order-item", {item, order, unitPrice})
				.save();
		},

		updateOrderItem(model, key, val) {
			model.set(key, val);
		},

		saveOrderItem(model) {
			if(model.get("hasDirtyAttributes")) {
				return model
					.save()
					.catch(() => model.rollbackAttributes());
			}
		},

		deleteOrderItem(model) {
			model.destroyRecord();
		},

		async deleteOrder(model) {
			await model.destroyRecord();

			this.transitionTo("sales-orders");
		},

		emailOrder(model) {
			const notificationRules = model.get("location.notificationRules");
			notificationRules.forEach(nr => {
				const notification = this.store.createRecord("notification");
				notification.set("notificationState", NotificationState.PENDING);
				notification.set("renderer", NotificationRenderer.UPDATED_SALES_ORDER);
				notification.set("order", model);
				notification.set("notificationRule", nr);

				notification.save();
			});
		},

		toggleOrderState(model) {
			const updatedState = model.get("isDraft")? OrderState.APPROVED: OrderState.DRAFT;
			model.set("orderState", updatedState);
			
			model.save()
		}
	}
});
