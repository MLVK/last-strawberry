import FactoryGuy from "ember-data-factory-guy";

FactoryGuy.define("address", {
  default: {
    street: FactoryGuy.generate(num => `Address ${num}`),
    city: FactoryGuy.generate(num => `City ${num}`),
    state: FactoryGuy.generate(num => `State ${num}`),
    zip: FactoryGuy.generate(num => `Zip ${num}`),
    lat: FactoryGuy.generate(num => Math.random() * num),
    lng: FactoryGuy.generate(num => Math.random() * num),

    locations: FactoryGuy.hasMany("location"),
    visitWindows: FactoryGuy.hasMany("visit-window"),
    routeVisits: FactoryGuy.hasMany("route-visit")
  }
});
