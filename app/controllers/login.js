import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate(user, pass) {
      return this.get('session')
        .authenticate('authenticator:devise', user, pass);
    }
  }
});
