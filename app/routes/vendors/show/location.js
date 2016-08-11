import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const INCLUDES = [
  'address',
  'address.visit-windows',
  'address.visit-windows.visit-window-days',
  'visit-days'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params){
    return this.store.findRecord('location', params.location_id, { reload:true, include:INCLUDES.join(',')});
  },

  async afterModel(model) {
    let address = await model.get('address');
    if(Ember.isNone(address)) {
      address = this.store.createRecord('address');
    }
    model.set('address', address);

    return model;
  },

  actions: {
    fieldChanged(model, key, e) {
      model.set(key, e.target.value);
    },

    async saveLocation() {
      const location = this.modelFor('vendors.show.location');
      location.save();
    },

    switchAddress(location, address) {
      location.set('address', address);
      location.save();
    },

    async saveAddress(location, changeset) {
      await changeset.save();
      location.save();
    },

    onVisitDayChange(day, enabled) {
      const location = this.modelFor('vendors.show.location');
      const visitDays = location.get('visitDays');

      const visitDay = visitDays
                        .find(visitDay => visitDay.get('day') === day) ||
                            this.store.createRecord('visit-day', {location, day});

      visitDay.set('enabled', enabled);
      visitDay.save();
    },

    async onVisitWindowDayChange(visitWindow, day, enabled) {
      if(visitWindow.get('hasDirtyAttributes')) {
        await visitWindow.save();
      }

      const visitWindowDay = visitWindow
                              .get('visitWindowDays')
                              .find(vwd => vwd.get('day') === day) ||
                                this.store.createRecord('visit-window-day', {visitWindow, day});

      visitWindowDay.set('enabled', enabled);
      visitWindowDay.save();
    },

    onVisitWindowChange(model, attr, val) {
      model.set(attr, val);
      model.save();
    },

    createVisitWindow() {
      const location = this.modelFor('vendors.show.location');
      const address = location.get('address');
      this.store.createRecord('visit-window', {address});
    }
  }
});
