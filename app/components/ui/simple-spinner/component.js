import Ember from 'ember';
import { style } from 'last-strawberry/utils/styles';

export default Ember.Component.extend({
  classNameBindings: ['enabled::disabled'],
  attributeBindings: ['componentStyles:style'],

  @style('size')
  componentStyles(size = 2) {
    return {
      'width': `${size}em`,
      'height': `${size}em`
    };
  }
});
