import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui/dd-card/dd-card-body', 'Integration | Component | ui/dd card/dd card body', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui/dd-card/dd-card-body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui/dd-card/dd-card-body}}
      template block text
    {{/ui/dd-card/dd-card-body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
