import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Mixin.create({
  @computed('lat', 'lng')
  locationHash(lat, lng) {
    Ember.assert('Must declare a lat property when using the location-hashable mixin', lat);
    Ember.assert('Must declare a lng property when using the location-hashable mixin', lng);
    return `~${lat}_${lng}`.replace('.', '');
  }
});
