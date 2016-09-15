import uniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

import {
  validatePresence,
  validateFormat,
  validateLength
} from "ember-changeset-validations/validators";

export default function(session){
  return {
    firstName: [
      validatePresence(true)
    ],

    lastName: [
      validatePresence(true)
    ],

    email: [
      validateFormat({ type: "email" }),
      uniqueFieldValidator({ session, type: "user", errorMsg: "Another user is using that email." })
    ],

    role: [
      validatePresence(true)
    ],

    password: [
      validateLength({ min: 8 })
    ],

    phone: [
      validateFormat({ type: "phone", allowBlank: true})
    ]
  }
}
