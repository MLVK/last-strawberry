import Ember from "ember";
import { updateModelField } from "last-strawberry/actions/model-actions";

export default Ember.Component.extend({
  classNames: ["row", "stretch", "notificationRow"],

  willRender(){
    this.get("changeset").validate();
  },

  actions:{
    updateModelField,

    updateCheckboxField(key, value){
      const changeset = this.get("changeset");
      changeset.set(key, value);

      this.attrs.saveNotification(changeset);
    }
  }
});
