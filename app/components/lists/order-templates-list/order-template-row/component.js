import Ember from 'ember';
import computed from "ember-computed-decorators";

const DAYS_OF_WEEK = ["m", "t", "w", "th", "f", "s", "su"];

export default Ember.Component.extend({
  classNames:['row', 'stretch'],

  @computed('model.orderTemplateDays', 'model.frequency')
  label(days, frequency) {
    const daysFragment = days
      .map(otd => DAYS_OF_WEEK[otd.get("day")])
      .join('-');

    const frequencyFragment = `Every ${frequency} week(s)`;

    if(daysFragment === "") {
      return "Not yet scheduled";
    } else {
      return `${daysFragment} - ${frequencyFragment}`;
    }
  },

  click() {
    this.get('selectOrderTemplate')(this.get('model.id'));
  }
});
