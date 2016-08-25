import Ember from 'ember';
import config from 'last-strawberry/config/environment';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  send(type, url, data, headers = {}){
    return new Ember.RSVP.Promise((res, rej) => {
      this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {

        const mergedHeaders = _.merge(headers, {[headerName]: headerValue });
        const options = {
          url:`${config.apiHost}/${url}`,
          data,
          headers: mergedHeaders,
          type
        };

        Ember.$.ajax(options)
          .fail(rej)
          .always(res);
      });
    });
  },

  postRequest(url, data, headers = {}){
    return this.send('POST', url, data, headers);
  },

  getRequest(url, headers = {}){
    return this.send('GET', url, {}, headers);
  }
});
