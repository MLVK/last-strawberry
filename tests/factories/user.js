import FactoryGuy from "ember-data-factory-guy";
import Roles from "last-strawberry/constants/roles";

FactoryGuy.define("user", {
  default: {
    firstName: FactoryGuy.generate(num => `first name ${num}`),
    lastName: FactoryGuy.generate(num => `last name ${num}`),
    email: FactoryGuy.generate(num => `email${num}@fake.com`),
    password: "password",
    role: Roles.PENDING,
    phone: "213 232-2322"
  },

  traits: {
    admin: { role: Roles.ADMIN},
    driver: { role: Roles.DRIVER },
    accountant: { role: Roles.ACCOUNTANT }
  }
});
