import Ember from 'ember';
import FactoryGuy from 'ember-data-factory-guy';
import {
  buildList,
  make,
  makeList
} from 'ember-data-factory-guy';

FactoryGuy.define('route-visit', {
  default: {
    fulfillments: FactoryGuy.hasMany('fulfillment'),
    address: FactoryGuy.belongsTo('address')
  },

  traits: {
    with_route_plan: {
      routePlan: FactoryGuy.belongsTo('route-plan')
    }
  }
});

const buildRouteVisit = (options = {}) => {
  const company = make("company"),
        address = make("address"),
        routePlan = make("route-plan"),
        fulfillments = makeList("fulfillment", 1);

  make("location", {company, address});

  return Ember.merge({
    address,
    fulfillments,
    routePlan
  }, options);
}

const buildRouteVisitsWithSharedRoutePlan = count => {
  const builder = R.partial(buildRouteVisit, [{routePlan: make("route-plan")}]);
  return buildList("route-visit", ...R.times(builder, count));
}

const buildRouteVisitsWithUniquePlan = count => {
  return buildList("route-visit", ...R.times(buildRouteVisit, count));
}

const buildRouteVisits = count => {
  const builder = R.partial(buildRouteVisit, [{routePlan: undefined}]);
  return buildList("route-visit", ...R.times(builder, count));
}

export {
  buildRouteVisits,
  buildRouteVisitsWithSharedRoutePlan,
  buildRouteVisitsWithUniquePlan
}
