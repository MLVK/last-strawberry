import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['col', 'card-1'],
  isHidden:true,

  @computed('orders.@each.{totalQuantity}')
  itemTotals(orders = Ember.A()) {
    return _
      .chain(orders.toArray())
      .map(order => order.get('orderItems').toArray())
      .flatten()
      .groupBy(orderItem => orderItem.get('item.name'))
      .mapValues(orderItems => orderItems.reduce((acc, cur) => acc + Number(cur.get('quantity')), 0))
      .map((quantity, name) => ({name, quantity}))
      .value();
  }
});
