import co from "npm:co";
import Ember from 'ember';
import ENV from "last-strawberry/config/environment";

export function optimizeRoutePlan(routePlan) {
  const structure = {network:{}, visits:{}, solution:{vehicle:[]}};

  const payload = routePlan.get('routeVisits')
    .reduce((acc, rv) => {
      const id = rv.get('position'),
            lat = rv.get('visitWindow.lat'),
            lng = rv.get('visitWindow.lng'),
            start = rv.get('visitWindow.arriveAtFormatted'),
            end = rv.get('visitWindow.departAtFormatted'),
            duration = rv.get('visitWindow.service');

      acc.network[id] = {lat, lng};
      acc.visits[id] = {start, end, duration};
      acc.solution.vehicle.pushObject(String(id));
      return acc;
    }, structure);

  payload.network.depot = {
    "name": "Depot",
    "lat": 34.1693692,
    "lng": -118.3149415
  };

  payload.fleet = {
    "vehicle": {
        "start-location": "depot",
        "end-location": "depot"
    }
  };

  co(function *(){
    const response = yield Ember.$.ajax({
      url: 'https://routific.com/api/min-idle',
      type: 'POST',
      headers: {
        'Authorization': `bearer ${ENV.routificApi.accessToken}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(payload)
    });

    response.solution.vehicle
      .filter(t => t.location_id !== 'depot')
      .forEach(({location_id, arrival_time, finish_time}, index) => {
        const rv = routePlan.get('routeVisits').objectAt(index);
        const mArrivalAt = moment(arrival_time, 'HH:mm');
        const arriveAtMinutes = mArrivalAt.minutes() + (mArrivalAt.hours() * 60);
        const mDepartAt = moment(finish_time, 'HH:mm');
        const departAtMinutes = mDepartAt.minutes() + (mDepartAt.hours() * 60);
        rv.setProperties({'arriveAt':arriveAtMinutes, 'departAt':departAtMinutes});
      });
  });
}
