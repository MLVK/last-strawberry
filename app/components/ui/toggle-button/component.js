import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  notEmpty
} = Ember.computed;

const {
  isPresent
} = Ember;

export default Ember.Component.extend({
  classNames: ['row', 'center'],
  classNameBindings: ['isSelected:selected'],

  hasLabel: notEmpty("label"),
  hasIcon: notEmpty("iconName"),

  shouldEnableTooltip: notEmpty("toolTipMessage"),

  @computed("selected")
  isSelected(val) {
    return (val === "true" || val === true);
  },

  @computed("isSelected", "selectedTooltipMessage", "unSelectedTooltipMessage")
  toolTipMessage(isSelected, selectedTooltipMessage, unSelectedTooltipMessage) {
    if(isSelected && isPresent(selectedTooltipMessage)) {
      return selectedTooltipMessage;
    }

    if(!isSelected && isPresent(unSelectedTooltipMessage)) {
      return unSelectedTooltipMessage;
    }

    return undefined;
  }
});
