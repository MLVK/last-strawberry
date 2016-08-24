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

    code: [
      validatePresence(true),
      uniqueFieldValidator({ session, type: "location", errorMsg: "Another location is using that code." }),
      validateLength({ max: 7 })
    ]
  }
}
