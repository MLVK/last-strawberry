import Em from 'ember';
import computed from 'ember-computed-decorators';
import COLOR_SCHEMES from 'last-strawberry/constants/color-schemes';

export default Em.Component.extend({
  classNames: ['col'],
  classNameBindings: ['indexStyle'],

  @computed('model.id')
  saveRoutePlanBlueprintDomId(id) {
    return `saveRoutePlanBlueprint-${id}`
  },

  @computed("index")
  colorScheme(index = 0) {
    return COLOR_SCHEMES[index];
  },

  actions: {
    delete() {
      this.attrs.destroyRoutePlan(this.get('model'));
    },

    saveRoutePlanBlueprint() {
      this.attrs.saveRoutePlanBlueprint(this.get('model'), this.$('.saveRoutePlanBlueprint'));
    }
  }
});
