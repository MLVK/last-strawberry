import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { filterBy } = Ember.computed;
const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

export default Ember.Controller.extend({
  deliveryDate: tomorrow,

  @computed('salesOrders.@each.{deliveryDate}', 'deliveryDate')
  filteredSalesOrders(salesOrders, deliveryDate) {
    return salesOrders.filter(order => {
      const matchesDate = order.get('deliveryDate') === deliveryDate;
      return matchesDate && order.get('isSalesOrder')
    });
  },

  @computed('filteredSalesOrders.[]')
  unfulfilledLocations(salesOrders) {
    const fulfilledLocations = salesOrders.map(o => o.get('location').content);
    const allLocations = this.get('locations').toArray();

    return _.difference(allLocations, fulfilledLocations);
  },

  @computed('deliveryDate')
  isOldDate(deliveryDate) {
    return moment(deliveryDate).isBefore(tomorrow);
  },

  filteredItems: filterBy('items', 'isSold', true),

  actions: {
    onRequestNewOrder() {
      this.set('showCreateSalesOrderModal', true);
    },

    closeCreateSalesOrder() {
      this.set('showCreateSalesOrderModal', false);
    }
  }
});
