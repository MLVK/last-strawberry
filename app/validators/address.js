import {
  validatePresence
} from 'ember-changeset-validations/validators';

export default {
  street: validatePresence(true),
  city: validatePresence(true),
  state: validatePresence(true),
  zip: validatePresence(true),
  lat: validatePresence(true),
  lng: validatePresence(true)
}
