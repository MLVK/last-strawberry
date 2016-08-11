import uniqueFieldValidator from 'last-strawberry/validators/unique-field-validator';

import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default function(session){
  return {
    name: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ],
    code: [
      uniqueFieldValidator({ session, type: 'item', errorMsg: 'Another product is using that code.' }),
      validateLength({ min: 3 }),
      validatePresence(true)
    ],
    description: [
      validateLength({ min: 5 }),
      validatePresence(true)
    ]
  }
}
