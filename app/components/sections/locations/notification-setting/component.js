import Ember from 'ember';
import { updateModelField, saveModelIfDirty } from 'last-strawberry/actions/model-actions';

export default Ember.Component.extend({
  classNames: ['row', 'stretch'],

  willRender(){
    this.get('changeset').validate();
  },

  actions:{
    updateModelField,

    updateCheckboxField(key, value){
      let changeset = this.get('changeset');
      changeset.set(key, value);

      this.attrs.saveNotification(changeset);
    }
  }
});
