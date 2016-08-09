import Ember from 'ember';
import computed from 'ember-computed-decorators';
import {
  placeToChangeset
} from 'last-strawberry/utils/google-place-utils';


const {
  oneWay
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ['section_location_address-manager', 'col', 'stretch'],

  @computed('model.lat')
  lat(val) {
    return val || 33.89891688437142
  },

  @computed('model.lng')
  lng(val) {
    return val || -117.90527343750001
  },

  zoom: 13,

  tempAddress: oneWay('value.full'),

  actions: {
    update(place) {
      this.attrs.saveAddress(placeToChangeset(place));
    },

    onBlur() {
      this.set('tempAddress', this.get('value.full'));
    }
  }
});
