import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],
  popupItems: [
    {route:'products', label:'Products'},
    {route:'items', label:'Items'},
    {route:'customers', label:'Customers'},
    {route:'vendors', label:'Vendors'},
    {route:'price-tiers', label:'Price Tiers'}
  ]
});
