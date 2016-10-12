import {
  validatePresence,
  validateLength,
  validateNumber
} from "ember-changeset-validations/validators";

export default {
  name: validatePresence(true),

  locationCodePrefix: [
    validatePresence(true),
    validateLength({ max: 3 })
  ],

  terms: [
    validateNumber()
  ],

  priceTier: validatePresence(true)
}
