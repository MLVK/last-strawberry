import Ember from 'ember';
import {
  updateModelField,
  saveModelIfDirty
} from 'last-strawberry/actions/model-actions';

export default Ember.Route.extend({
  model(params){
    return this.store.findRecord('company', params.id);
  },

  actions: {
    updateModelField,
    saveModelIfDirty
  }
});
