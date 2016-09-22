import {
  validatePresence,
  validateLength
} from "ember-changeset-validations/validators";

export default {
  name: validatePresence(true),

  locationCodePrefix: [
    validatePresence(true),
    validateLength({ max: 3 })
  ],

  terms: validatePresence(true)
}
