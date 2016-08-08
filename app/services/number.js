import Ember from 'ember';

export default Ember.Service.extend({
  getCleanRate(rate){
    rate = parseFloat(rate, 10);
    rate =  isNaN(rate)? 0: rate;
    let cleanedRate = 0;

    if(rate >= 1 && rate <= 100) {
      cleanedRate = rate/100;
    }

    if(rate < 1 && rate > 0) {
      cleanedRate = rate;
    }

    if(rate >= 100) {
      cleanedRate = 1;
    }

    if(rate <= 0) {
      cleanedRate = 0;
    }

    return cleanedRate;
  },

  formatRate(rate){
    let cleanedRate = this.getCleanRate(rate) * 100;

    // Clear zero after decimal point
    cleanedRate = Number(cleanedRate.toFixed(2));
    return `${cleanedRate} %`;
  }
});
