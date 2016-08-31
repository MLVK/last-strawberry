import uniqueFieldValidator from "last-strawberry/validators/unique-field-validator";
import { validatePresence } from "ember-changeset-validations/validators";

export default function(session){
  return {
    name: [
      validatePresence(true),
      uniqueFieldValidator({ session, type: "routePlanBlueprint", errorMsg: "Another template is using that name." })
    ]
  }
}
