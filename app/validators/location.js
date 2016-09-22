import {
  validatePresence,
  validateLength
} from "ember-changeset-validations/validators";

export default {
  name: validatePresence(true),

  code: [
    validatePresence(true),
    validateLength({ max: 7 })
  ]
}
