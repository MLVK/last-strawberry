import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
    make,
    manualSetup
  } from 'ember-data-factory-guy';

moduleForComponent('sections/products/product-editor', 'Integration | Component | sections/products/product tier editor', {
  integration: true,

  beforeEach: function () {
    manualSetup(this.container);
  }
});

test('it shows the price tiers name', function(assert) {
  const priceTier = make('price-tier');

  this.set('model', priceTier)
  this.set('updateModelField', () => {});
  this.set('saveModelIfDirty', () => {});
  this.set('destroyPriceTier', () => {});
  this.render(hbs`{{sections/price-tiers/price-tier-editor
    model=model
    updateModelField=updateModelField
    saveModelIfDirty=saveModelIfDirty
    destroyPriceTier=destroyPriceTier
    }}`);

  assert.equal(this.$('.priceTierName input').val().trim(), priceTier.get('name'));
});
