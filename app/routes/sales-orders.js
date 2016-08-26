import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import Ember from "ember";
import config from "last-strawberry/config/environment";

const BEFORE_MODEL_INCLUDES = [
  "locations",
  "locations.company"
];

const MODEL_INCLUDES = [
	"order-items",
	"order-items.item",
  "location",
  "location.company",
  "location.company.price-tier",
  "location.company.price-tier.item-prices",
  "location.company.price-tier.item-prices.item"
];

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  queryParams: {
    deliveryDate: {
      refreshModel: true
    }
  },

	setupController(controller, model) {
    this._super(controller, model);

		controller.set("salesOrders", this.store.peekAll("order"));
		controller.set("companies", this.store.peekAll("company"));
    controller.set("locations", this.store.peekAll("location"));
	},

	model(params){
    this.params = params;

    return Ember.RSVP.all([
      this.store.query("item", {"filter[is_sold]":true}),
      this.store.query("company", {include:BEFORE_MODEL_INCLUDES.join(",")}),
      this.store.query("order", {
        "filter[order_type]":"sales-order",
        "filter[delivery_date]":params.deliveryDate,
        include:MODEL_INCLUDES.join(",")
      })
    ]);
	},

  showSalesOrder(order) {
    this.transitionTo("sales-orders.show", order.get("id"));
  },

  actions: {
    onOrderSelected(order) {
      this.showSalesOrder(order);
    },

    async createSalesOrder(location) {
      const deliveryDate = this.paramsFor("sales-orders").deliveryDate;

      const order = await this.store
        .createRecord("order", {location, deliveryDate})
        .save();

      this.showSalesOrder(order);
    },

    stubOrders () {
      const deliveryDate = this.paramsFor("sales-orders").deliveryDate;

      this.get("session").authorize("authorizer:devise", async (headerName, headerValue) => {

        const headers = {};
        headers[headerName] = headerValue;
        const payload = {
          url:`${config.apiHost}/orders/stub_orders`,
          data:{deliveryDate},
          headers,
          type:"POST"
        };

        const newOrders = await Ember.$.ajax(payload);
        this.store.pushPayload(newOrders);
      });
    },

    onDateSelected(date) {
      const deliveryDate = this.paramsFor("sales-orders").deliveryDate;

      if(deliveryDate !== moment(date).format("YYYY-MM-DD")) {
        this.controllerFor("sales-orders").set("deliveryDate", moment(date).format("YYYY-MM-DD"));
        this.transitionTo("sales-orders");
      }
    }
  }
});
