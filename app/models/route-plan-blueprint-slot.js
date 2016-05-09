import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  position: attr('number'),
  address: belongsTo('address'),
  routePlanBlueprint: belongsTo('route-plan-blueprint')
});
