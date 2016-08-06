import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  number: Ember.inject.service(),

  classNames: ['row', 'stretch'],
  classNameBindings: ['model.itemDesire.enabled:enabled:disabled'],

  @computed('index')
  indexFormatted(index){
    return index + 1;
  },

  @computed('model.itemCreditRate.rate')
  creditRate(rate) {
    return this.get('number').formatRate(rate);
  },

  actions: {
    creditRateChanged(e) {
      const rate = Number(e.target.value);
      this.attrs.onCreditChange(this.get('model.itemCreditRate'), rate);
    },

    toggle() {
      this.attrs.onDesireChange(this.get('model.itemDesire'), !this.get('model.itemDesire.enabled'));
    }
  }
});
