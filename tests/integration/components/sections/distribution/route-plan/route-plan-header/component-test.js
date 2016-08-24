import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/distribution/route-plan/route-plan-header', 'Integration | Component | sections/distribution/route plan/route plan header', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/distribution/route-plan/route-plan-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/distribution/route-plan/route-plan-header}}
      template block text
    {{/sections/distribution/route-plan/route-plan-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
