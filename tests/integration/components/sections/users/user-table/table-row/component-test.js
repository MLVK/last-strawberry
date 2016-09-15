import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sections/users/user-table/table-row', 'Integration | Component | sections/users/user table/table row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sections/users/user-table/table-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sections/users/user-table/table-row}}
      template block text
    {{/sections/users/user-table/table-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
