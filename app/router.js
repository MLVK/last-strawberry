import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('sales-orders', function() {
    this.route('show', {path:':id'});
  });

  this.route('clients', function() {
    this.route('show', {path:':id'});
  });

  this.route('distribution');

  this.route('companies', function() {
    this.route('show', {path:':company_id'}, function() {
      this.route('location', {path:'/locations/:location_id'});
    });
  });
});

export default Router;
