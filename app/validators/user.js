import {
  validatePresence,
  validateFormat,
  validateLength
} from "ember-changeset-validations/validators";

export default {
  firstName: validatePresence(true),
  lastName: validatePresence(true),
  email: validateFormat({ type: "email" }),
  role: validatePresence(true),
  password: validateLength({ min: 8 }),
  phone: validateFormat({ type: "phone", allowBlank: true})
}
