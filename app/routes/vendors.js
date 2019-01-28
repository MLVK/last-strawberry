import Route from '@ember/routing/route';

export default Route.extend({

  setupController(controller) {
    controller.set("companies", this.store.peekAll("company"));
  },

  model(){
    return this.store.query("company",{"filter[is_vendor]":true});
	},

  actions: {
    showVendor(id) {
      this.transitionTo("vendors.show", id);
    },

    async createNewVendor(name) {
      const vendor = this.store.createRecord("company", {name, isVendor:true, isCustomer:false});
      await vendor.save();

      this.transitionTo("vendors.show", vendor);
    }
  }
});
