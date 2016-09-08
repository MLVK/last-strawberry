import Ember from 'ember';
import computed from 'ember-computed-decorators';
const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['col', 'spaceBetween', 'card-1'],
  hasData:          notEmpty('salesData'),

  @computed('salesData.ts')
  lastUpdated(timestamp) {
    console.log(timestamp);
    return moment.unix(timestamp);
  }

});
