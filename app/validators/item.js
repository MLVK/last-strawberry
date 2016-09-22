import {
  validatePresence,
  validateLength,
  validateNumber
} from "ember-changeset-validations/validators";

export default {
  name: [
    validateLength({ min: 5 }),
    validatePresence(true)
  ],

  code: [
    validateLength({ min: 3 }),
    validatePresence(true)
  ],

  description: [
    validateLength({ min: 5 }),
    validatePresence(true)
  ],

  defaultPrice: validateNumber(),
  position: validateNumber()
}
