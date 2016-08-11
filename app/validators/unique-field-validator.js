import Ember from 'ember';
import config from 'last-strawberry/config/environment';

export default function(options) {
  const { session, type } = options;
  return function uniqueValidator(key, value, oldValue) {

    if(value === oldValue) {
      return true;
    }

    return new Ember.RSVP.Promise(res => {
      session.authorize('authorizer:devise', (headerName, headerValue) => {
        const headers = {};
        headers[headerName] = headerValue;
        const payload = {
          url:`${config.apiHost}/custom/unique_check`,
          data:{type, key, value},
          headers,
          type:'POST'
        };

        Ember.$.ajax(payload)
          .always(response => {
            if(response.unique) {
              res(response.unique);
            } else {
              const { errorMsg = `${key}: ${value} is already in use by another ${type}` } = options;
              res(errorMsg);
            }
        });
      });
    });
  }
}
