import Ember from 'ember';
import computed from 'ember-computed-decorators';
import { toPercentage } from 'last-strawberry/utils/math';
const { alias } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row', 'stretch'],
  classNameBindings: ['model.itemDesire.enabled:enabled:disabled'],

  @computed('index')
  indexFormatted(index){
    return index + 1;
  },

  creditRate: alias('model.itemCreditRate.rate'),

  actions: {
    creditRateChanged(e) {
      this.attrs.onCreditChange(this.get('model.itemCreditRate'), toPercentage(e.target.value));
    },

    toggle() {
      this.attrs.onDesireChange(this.get('model.itemDesire'), !this.get('model.itemDesire.enabled'));
    }
  }
});
