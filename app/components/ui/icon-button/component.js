import Ember from 'ember';
import { style } from 'last-strawberry/utils/styles';
import computed from 'ember-computed-decorators';

const { notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row', 'ui_icon-button', 'btn'],
  classNameBindings: ['disabled:disabled', 'flat:flat:card-1'],
  attributeBindings:['componentStyles:style'],

  hasLabel: notEmpty('label'),

  startSpin() {
    const targ = this.$('.iconContainer');
    this.spinTween = TweenMax.to(targ, 0.5, {rotation:360, repeat:-1});
  },

  stopSpin() {
    this.clearTween();
    const targ = this.$('.iconContainer');
    TweenMax.to(targ, 0, {rotation:0});
  },

  clearTween() {
    if(this.spinTween){
      this.spinTween.kill();
    }
  },

  willDestroyElement() {
    this.clearTween();
  },

  @computed('type', 'loading')
  iconName(type, loading) {
    return loading ? 'loop' : type;
  },

  @style('size', 'padding', 'color', 'backgroundColor', 'borderRadius')
  componentStyles(
    size = '1',
    padding,
    color = 'white',
    backgroundColor = "",
    borderRadius = 0
  ) {
    padding = padding === undefined ? size: padding;

    return {
      'padding': `${padding}em`,
      'font-size': `${size/2}em`,
      'border-radius': `${borderRadius}px`,
      'color': color,
      'background-color': backgroundColor
    };
  },

  click() {
    if(!this.get('loading')){
      this.set('loading', true);
      this.startSpin();

      const response = this.attrs.action();
      const promise = response ? response : Ember.RSVP.resolve();

      Ember.RSVP.allSettled([promise])
        .then(() => {
          this.set('loading', false);
          this.stopSpin();
        })
        .catch(() => {
          this.set('loading', false);
          this.stopSpin();
        });
    }
  }

});
