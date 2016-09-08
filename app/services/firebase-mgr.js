import Ember from 'ember';

export default Ember.Service.extend({
  client: new Firebase('https://in-spiritus.firebaseio.com/'),
  buildRef(path) {
    return this.get('client').child(path);
  }
});
