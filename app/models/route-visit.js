import Ember from 'ember';
import LocationHashable from 'last-strawberry/mixins/location-hashable';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { alias, empty, notEmpty } = Ember.computed;

export default Model.extend(LocationHashable, {
  date:             attr('date'),
  position:         attr('number'),
  arriveAt:         attr('number'),
  departAt:         attr('number'),
  fulfillmentCount: attr('number'),
  hasPickup:        attr('boolean'),
  hasDrop:          attr('boolean'),

  fulfillments:     hasMany('fulfillment'),
  routePlan:        belongsTo('route-plan'),
  address:          belongsTo('address'),

  isValid:          notEmpty('fulfillments'),

  visitWindow:      alias('address.visitWindows.firstObject'),
  lat:              alias('address.lat'),
  lng:              alias('address.lng'),

  isOrphan:         empty('routePlan.id')
});
