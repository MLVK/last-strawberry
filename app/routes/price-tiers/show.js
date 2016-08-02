import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';
import { updateModelField, saveModelIfDirty } from 'last-strawberry/actions/model-actions';

const MODEL_INCLUDES = [
  'item-prices',
  'item-prices.item',
  'item-prices.price-tier',
  'item-prices.item.item-prices'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, priceTier) {
    const fulfilledItems = priceTier.get('itemPrices')
      .map(ip => ip.get('item').content);

    const allItems = this.store.peekAll('item').toArray();
    const openItems = _.difference(allItems, fulfilledItems);

    openItems.forEach(item =>
      this.store.createRecord('item-price', {priceTier, item}));

    this._super(controller, priceTier);
  },

  model(params) {
    return Ember.RSVP.all([
      this.store.findAll('item')
    ])
    .then(() => {
      return this.store.findRecord('price-tier', params.id, { reload: true, include:MODEL_INCLUDES.join(',') });
    });
  },

  actions: {
    updateModelField,
    saveModelIfDirty,
    destroyPriceTier() {
      this.modelFor('price-tiers.show')
        .destroyRecord()
        .then(() => this.transitionTo('price-tiers'));
    }
  }
});
