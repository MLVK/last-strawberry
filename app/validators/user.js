import uniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

import {
  validatePresence,
  validateFormat
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
      validatePresence(true),
      validateFormat({ type: "email" }),
      uniqueFieldValidator({ session, type: "user", errorMsg: "Another user is using that email." }),
    ],

    role: [
      validatePresence(true)
    ]
  }
}
