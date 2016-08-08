import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/locations/item-settings', 'Integration | Component | sections/locations/item settings', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);

  this.set('itemSettings', {});
  this.set('updateItemDesire', () => assert.ok(true));
  this.set('updateItemCreditRate', () => assert.ok(true));
  this.set('onSaveMassCreditRate', () => assert.ok(true));

  this.render(hbs`{{sections/locations/item-settings
    itemSettings=itemSettings
    onDesireChange=(route-action 'updateItemDesire')
    onCreditChange=(route-action 'updateItemCreditRate')
    onSaveMassCreditRate=(route-action 'onSaveMassCreditRate')}}`);
});

// test('applies mass credit rate', function(assert) {
//   assert.expect(1);
//
//   this.set('itemSettings', {});
//   this.set('updateItemDesire', () => {});
//   this.set('updateItemCreditRate', () => {});
//   this.set('onSaveMassCreditRate', () => assert.ok(true));
//
//   this.render(hbs`{{sections/locations/item-settings
//     itemSettings=itemSettings
//     onDesireChange=(route-action 'updateItemDesire')
//     onCreditChange=(route-action 'updateItemCreditRate')
//     onSaveMassCreditRate=(route-action 'onSaveMassCreditRate')}}`);
//
//     this.$('.massCreditRate input').val(20);
//     // this.$('.massCreditRate button').click();
//     // debugger;
// });
