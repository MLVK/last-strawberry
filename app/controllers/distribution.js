import Ember from 'ember';
import computed from 'ember-computed-decorators';
import downloadFile from 'last-strawberry/utils/download-file';

export default Ember.Controller.extend({
  pdfGenerator:   Ember.inject.service(),

  queryParams:    ['date'],
  date:           moment().add(1, 'days').format('YYYY-MM-DD'),

  @computed('routePlans.@each.{date}', 'date')
  activeRoutePlans(routePlans, date) {
    return routePlans.filter(rp => rp.get('date') === date);
  },

  actions: {
    async printFulfillmentDocuments() {
      const { url, key } = await this.get('pdfGenerator')
        .printFulfillmentDocuments(this.get('activeRoutePlans'));
      return downloadFile(url, key);
    },

    onDateSelected(date) {
      this.set('date', moment(date).format('YYYY-MM-DD'));
    }
  }
});
