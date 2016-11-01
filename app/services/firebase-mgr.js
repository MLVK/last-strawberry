import Ember from 'ember';
import config from 'last-strawberry/config/environment';

export default Ember.Service.extend({
  client: new Firebase(config.firebase.host),
  buildRef(path) {
    return this.get('client').child(path);
  }
});
