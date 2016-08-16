import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("notification-rule", {
  default: {
    firstName: FactoryGuy.generate(num => `firstName ${num}`),
    lastName: FactoryGuy.generate(num => `lastName ${num}`),
    email: FactoryGuy.generate(num => `email ${num}`),
    wantsInvoice: false,
    wantsCredit: true,
    location: FactoryGuy.belongsTo("location")
  }
});
