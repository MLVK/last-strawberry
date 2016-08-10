import Ember from 'ember';
import ProductValidations from 'last-strawberry/validators/product';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  @computed('session')
  validators(session) {
    return ProductValidations(session);
  }
});
