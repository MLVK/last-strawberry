import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  firstName:      attr('string'),
  lastName:       attr('string'),
  email:          attr('string'),
  enabled:        attr('boolean', { defaultValue: true}),
  wantsInvoice:  attr('boolean', { defaultValue: true}),
  wantsCredit:   attr('boolean', { defaultValue: true}),

  location:      belongsTo('location')
});
