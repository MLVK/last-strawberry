import Ember from "ember";
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  @computed("fromDate", "toDate")
  isValid(fromDate, toDate) {
    return fromDate !== toDate && toDate !== undefined;
  },

  actions: {
    onToDateSelected(date) {
      this.set("toDate", moment(date).format("YYYY-MM-DD"));
    },

    submitDuplicateOrders() {
      return this.attrs
        .submit(this.get("fromDate"), this.get("toDate"))
        .then(this.attrs.close);
    }
  }
});
