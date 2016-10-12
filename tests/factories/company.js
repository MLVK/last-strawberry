import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('company', {
  default: {
    name: FactoryGuy.generate(num => `Company ${num}`),
    priceTier: FactoryGuy.belongsTo('price-tier'),
    locations: FactoryGuy.hasMany('location'),
    terms: 10,
    locationCodePrefix: FactoryGuy.generate(num => `lc${num}`)
  },

  vendor: {
    isVendor: true,
    isCustomer: false
  }
});
