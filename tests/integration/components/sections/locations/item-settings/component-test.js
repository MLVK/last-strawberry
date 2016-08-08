import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/item-settings', 'Integration | Component | sections/locations/item settings', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);

  this.set('itemSettings', {});
  this.set('onDesireChange', () => assert.ok(true));
  this.set('onCreditChange', () => assert.ok(true));
  this.set('massApplyCreditRate', () => assert.ok(true));

  this.render(hbs`{{sections/locations/item-settings
    itemSettings=itemSettings
    onDesireChange=onDesireChange
    onCreditChange=onDesireChange
    massApplyCreditRate=massApplyCreditRate}}`);
});

test('applies mass credit rate', function(assert) {
  assert.expect(1);

  this.set('itemSettings', {});
  this.set('onDesireChange', () => {});
  this.set('onCreditChange', () => {});
  this.set('massApplyCreditRate', () => assert.ok(true));

  this.render(hbs`{{sections/locations/item-settings
    itemSettings=itemSettings
    onDesireChange=onDesireChange
    onCreditChange=onCreditChange
    massApplyCreditRate=(action massApplyCreditRate)}}`);

  this.$('.massCreditRate input').val(20);
  this.$('.massCreditRate input').trigger('update');

  this.$('.massCreditRate button').click();
});
