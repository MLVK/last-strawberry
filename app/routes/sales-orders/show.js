import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const INCLUDES = [
	'order-items',
	'order-items.item',
  'location',
  'location.company',
  'location.item-desires',
  'location.item-desires.item'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {

	setupController(controller, model) {
    this._super(controller, model);

		const salesOrderController = this.controllerFor('sales-orders');
		salesOrderController.set('currentSelectedOrder', model);

		controller.set('items', this.store.peekAll('item'));
		controller.set('salesOrders', salesOrderController.get('filteredSalesOrders'));
	},

	model(params){
    this.params = params;
    return this.store.findRecord('order', params.id, {include:INCLUDES.join(',')});
	},

	clearSalesOrderController: function(){
		const salesOrderController = this.controllerFor('sales-orders');
    salesOrderController.set('currentSelectedOrder', undefined);
  }.on('deactivate'),

	actions: {
		async createOrderItem(item) {
			const order = this.modelFor('sales-orders.show');
			const company = await order.get('location.company');

			const unitPrice = await company.priceForItem(item);
			this.store
				.createRecord('order-item', {item, order, unitPrice})
				.save();
		},

		updateOrderItem(model, key, val) {
			model.set(key, val);
		},

		saveOrderItem(model) {
			if(model.get('hasDirtyAttributes')) {
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

			this.transitionTo('sales-orders');
		}
	}
});
