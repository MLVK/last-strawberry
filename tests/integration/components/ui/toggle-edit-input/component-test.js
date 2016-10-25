import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/toggle-edit-input', 'Integration | Component | ui/toggle edit input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/toggle-edit-input}}`);

  assert.equal(this.$().text().trim(), '');

});
