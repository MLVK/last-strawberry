import uniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

import {
  validatePresence,
  validateLength
} from "ember-changeset-validations/validators";

export default function(session){
  return {
    name: [
      validatePresence(true)
    ],

    locationCodePrefix: [
      validatePresence(true),
      uniqueFieldValidator({ session, type: "company", errorMsg: "Another company is using that code." }),
      validateLength({ max: 3 })
    ],

    terms: [
      validatePresence(true)
    ]
  }
}
