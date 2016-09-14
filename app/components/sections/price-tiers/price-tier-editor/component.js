import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  @computed('model.itemPrices.@each.{isNew,item}')
  openItemPrices(itemPrices = []) {
    return itemPrices.filter(ip => ip.get('isNew') && ip.get("item.active"));
  },

  @computed('model.itemPrices.@each.{isNew,item}')
  fulfilledItemPrices(itemPrices = []) {
    return itemPrices.filter(ip => !ip.get('isNew') && ip.get("item.active"));
  }
});
