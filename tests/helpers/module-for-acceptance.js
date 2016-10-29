import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { mockSetup, mockTeardown } from 'ember-data-factory-guy';

const { RSVP: { Promise } } = Ember;

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      Ember.$.mockjax({ url: "https://andruxnet-random-famous-quotes.p.mashape.com*", responseText: '{"quote":"Houston, we have a problem.","author":"Apollo 13","category":"Movies"}', type: 'POST' });

      mockSetup();

      // Enable for mockjax logging
      // $.mockjaxSettings.logging = true;
      // $.mockjaxSettings.logging = 4;

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return Promise.resolve(afterEach)
        .then(() => destroyApp(this.application))
        .then(() => mockTeardown());
    }
  });
}
