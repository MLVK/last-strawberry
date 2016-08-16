import Ember from "ember";
import NotificationValidations from "last-strawberry/validators/notification-rule";

export default Ember.Component.extend({
  NotificationValidations,

  actions:{
    saveNotification(changeset){
      if(changeset.get("isValid")){
        this.attrs.saveNotification(changeset);
      }
    }
  }
});
