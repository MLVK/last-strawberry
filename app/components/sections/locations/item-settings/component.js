import Ember from 'ember';

export default Ember.Component.extend({
  number: Ember.inject.service(),

  classNames: ['item-desires', 'col', 'wrap'],
  massCreditRate: '',

  _formatCreditRate() {
    let creditRate = this.get('number').formatRate(this.massCreditRate);
    this.set('massCreditRate', creditRate);
  },

  actions:{
    onMassCreditRateBlur(){
      this._formatCreditRate();
    }
  }
});
