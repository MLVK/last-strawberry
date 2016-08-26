import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { filterBy } = Ember.computed;
const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

export default Ember.Controller.extend({
  deliveryDate: tomorrow,

  @computed('orders.@each.{deliveryDate}', 'deliveryDate')
  filteredOrders(orders, deliveryDate) {
    return orders.filter(order => {
      const matchesDate = order.get('deliveryDate') === deliveryDate;
      return matchesDate && order.get('isPurchaseOrder')
    });
  },

  @computed('deliveryDate')
  isOldDate(deliveryDate) {
    return moment(deliveryDate).isBefore(tomorrow);
  },

  vendorLocations: filterBy('locations', 'isVendor', true),

  actions: {
    onRequestNewOrder() {
      this.set('showCreateOrderModal', true);
    },

    closeCreateOrder() {
      this.set('showCreateOrderModal', false);
    }
  }
});
