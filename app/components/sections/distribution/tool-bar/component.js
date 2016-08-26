import Ember from 'ember';
import computed from 'ember-computed-decorators';

const { not, notEmpty } = Ember.computed;

export default Ember.Component.extend({
  classNames: ['row'],
  currentSelectedRoutePlanTemplate: undefined,

  @computed('date')
  formattedDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },

  disabled: not('canCreateRoutePlans'),
  hasRoutePlanTemplates: notEmpty('routePlanBlueprints'),

  @computed('routePlans.@each.{publishedState}')
  allPublished(routePlans = []){
    return routePlans.every(rp => rp.get('isPublished'));
  },

  @computed('routePlans.@each.{isValid}')
  allPlansValid(routePlans = []){
    return routePlans.every(rp => rp.get('isValid'));
  },

  actions: {
    // togglePublishRoutePlans() {
    //   if(this.get('allPublished'))
    // },

    handleCreateRoutePlan() {
      if(!this.get('disabled')){
        this.attrs.createRoutePlan();
      }
    },

    selectRouteTemplate(template) {
      this.set('currentSelectedRoutePlanTemplate', undefined);
      this.attrs.applyTemplate(template);
    }
  }
});
