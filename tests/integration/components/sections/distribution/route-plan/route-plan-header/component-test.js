import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/distribution/route-plan/route-plan-header', 'Integration | Component | sections/distribution/route plan/route plan header', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);

  this.set("updateRoutePlan", () => {});
  this.render(hbs`{{sections/distribution/route-plan/route-plan-header
    updateRoutePlan=updateRoutePlan}}`);
});
