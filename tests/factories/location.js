import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("location", {
  default: {
    company: FactoryGuy.belongsTo("company"),
    address: FactoryGuy.belongsTo("address"),
    name: FactoryGuy.generate(num => `Location ${num}`),
    delivery_rate: 10,
    active: true,
    itemDesires: FactoryGuy.hasMany("item-desire"),
    itemCreditRates: FactoryGuy.hasMany("item-credit-rate"),
    visitDays: FactoryGuy.hasMany("visit-day"),
    code: "ABC001"
  }
});
