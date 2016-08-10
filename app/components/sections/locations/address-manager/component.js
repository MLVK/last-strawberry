import Ember from 'ember';
import computed from 'ember-computed-decorators';
import {
  placeToObject
} from 'last-strawberry/utils/google-place-utils';

const {
  oneWay
} = Ember.computed;

export default Ember.Component.extend({
  classNames: ['section_location_address-manager', 'col', 'stretch'],

  willRender(){
      this.get('value').validate();
  },

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
      const changeset = this.get('value');
      changeset.setProperties(placeToObject(place));
      if(changeset.get('isValid')){
        this.attrs.saveAddress(changeset);
      }
    },

    onBlur() {
      this.set('tempAddress', this.get('value.full'));
    }
  }
});
