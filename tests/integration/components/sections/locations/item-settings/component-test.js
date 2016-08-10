import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/item-settings', 'Integration | Component | sections/locations/item settings', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);

  this.render(hbs`{{sections/locations/item-settings}}`);
});

test('applies mass credit rate', function(assert) {
  assert.expect(1);

  this.set('massApplyCreditRate', () => assert.ok(true));
  this.render(hbs`{{sections/locations/item-settings
    massApplyCreditRate=(action massApplyCreditRate)}}`);

  this.$('.massCreditRate input').val(20);
  this.$('.massCreditRate button').click();
});

test('applies mass desire', function(assert) {
  assert.expect(1);

  this.set('massApplyDesire', () => assert.ok(true));
  this.render(hbs`{{sections/locations/item-settings
    massApplyDesire=(action massApplyDesire)}}`);

  this.$('.massDesire .desiredToggle').click();
});
