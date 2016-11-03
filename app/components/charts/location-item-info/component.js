import Ember from 'ember';
import computed from 'ember-computed-decorators';
const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['col', 'spaceBetween', 'card-1'],
  classNameBindings: ['hasItem::hidden'],
  hasData:        notEmpty('salesData'),
  hasItem:        notEmpty('item'),
  hasLastUpdated: notEmpty('salesData.ts'),

  @computed('salesData.ts')
  lastUpdated(timestamp) {
    return moment.unix(timestamp);
  }
});
