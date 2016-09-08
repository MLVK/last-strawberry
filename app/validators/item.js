import uniqueFieldValidator from "last-strawberry/validators/unique-field-validator";

import {
  validatePresence,
  validateLength,
  validateNumber
} from "ember-changeset-validations/validators";

export default function(session){
  return {
    name: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ],

    code: [
      uniqueFieldValidator({ session, type: "item", errorMsg: "Another item is using that code." }),
      validateLength({ min: 3 }),
      validatePresence(true)
    ],

    description: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ],

    defaultPrice: [
      validateNumber()
    ],

    position: [
      validateNumber()
    ]
  }
}
