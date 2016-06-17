import Ember from 'ember';
import computed from 'ember-computed-decorators';
import colors from 'last-strawberry/constants/colors';

const { alias, gt, filter } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['card-1'],
  attributeBindings: ['data-location-hash'],

  locations: alias('model.address.locations'),
  company: alias('model.address.locations.firstObject.company'),

  addressHasMultipleLocations: gt('locations.length', 1),

  visitWindows: alias('model.address.visitWindows'),

  validVisitWindows: filter('visitWindows', function(vw){
    return vw.validForDate(this.get('date'));
  }),

  validVisitWindow: alias('validVisitWindows.firstObject'),

  colorScheme: {color:colors.DARK_GREY, backgroundColor:colors.DARK_ORANGE},

  @computed('company.name', 'locations.firstObject.id', 'addressHasMultipleLocations')
  title(companyName, locationId, hasMultiple) {
    return hasMultiple ? `${companyName} - Multiple` : `${companyName} - ${locationId}`;
  },

  @computed('model.address', 'model.date')
  visitWindow(address, date) {
    return address.content.visitWindowForDate(date);
  },

  actions: {
    removeRouteVisit() {
      if(this.attrs.removeRouteVisit) {
        this.attrs.removeRouteVisit(this.get('model'));
      }
    }
  }
});
