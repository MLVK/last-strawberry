import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['section_sales-order_order-item-editor', 'row'],
  classNameBindings:['highlighted'],

  _blur() {
    this.set('highlighted', false);
    this.attrs.save(this.get('model'));
  },

  actions: {
    onFocus() {
      this.set('highlighted', true);
      this.attrs.onOrderItemChange(this.get('model.item'));
    },

    onBlur() {
      if(!this.get('model.quantity')){
        this.set('model.quantity', 0)
      }

      this._blur();
    },

    onBlurUnitPrice() {
      if(!this.get('model.unitPrice')){
        this.set('model.unitPrice', 0)
      }

      this._blur();
    }
  },

  @computed('index')
  formattedIndex(index) {
    const num = S(index + 1).padLeft(2, '0').s;
    return `${num}.`;
  }
});
