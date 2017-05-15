import Ember from 'ember';
import DS from 'ember-data';

const { attr, belongsTo } = DS;
const { alias } = Ember.computed;

export default DS.Model.extend({

  orderTemplate:  belongsTo('order-template'),
  item:           belongsTo('item'),

  quantity:       attr('number', {defaultValue: 0}),

  position:       alias('item.position')
});
