import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  firstName:      attr('string'),
  lastName:       attr('string'),
  email:          attr('string'),
  enabled:        attr('boolean', { defaultValue: true}),
  wants_invoice:  attr('boolean', { defaultValue: false}),
  wants_credit:   attr('boolean', { defaultValue: false}),

  location:      belongsTo('location')
});
