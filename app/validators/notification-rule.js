import {
  validatePresence,
  validateFormat
} from "ember-changeset-validations/validators";

export default {
  firstName: validatePresence(true),
  email: [
    validatePresence(true),
    validateFormat({ type: "email" })
  ],
  wantsInvoice:  validatePresence(true),
  wantsCredit:   validatePresence(true)
}
