import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {
  updateModelField,
  saveModelIfDirty
} from 'last-strawberry/actions/model-actions';

const INCLUDES = [
  'locations',
	'locations.address'
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params){
    return this.store.findRecord('company', params.id, { reload:true, include:INCLUDES.join(',')});
  },

  actions: {
    updateModelField,
    saveModelIfDirty,

    showLocation(id) {
      this.transitionTo('vendors.show.location', id);
    },
    
    async createNewLocation(vendor) {
      const location = this.store.createRecord('location', {company: vendor, name});
      await location.save();

      this.transitionTo('vendors.show.location', location);
    }
  }
});
