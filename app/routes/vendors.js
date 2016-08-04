import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller) {
    controller.set('vendors', this.store.peekAll('company'));
  },

  model(){
    return this.store.query('company', {isVendor: true});
	},

  actions: {
    showVendor(id) {
      this.transitionTo('vendors.show', id);
    },

    async createNewVendor(name) {
      const vendor = this.store.createRecord('company', {name, isVendor:true, isCustomer:false});
      console.log('vendor', vendor);
      await vendor.save();
      this.transitionTo('vendors.show', vendor);
    }
  }
});
