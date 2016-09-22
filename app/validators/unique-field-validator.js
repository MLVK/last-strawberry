import Ember from "ember";
import { toUnderscore } from "last-strawberry/utils/string";
import config from "last-strawberry/config/environment";

export default Ember.Object.extend({
  session: null,
  type: "type",
  key: "key",
  oldValue:"",
  isValid: true,

  _checkUniqueEndpoint(value){
    const data = {
      type: this.type,
      key: toUnderscore(this.key),
      value
    }

    return new Ember.RSVP.Promise(res => {
      this.session.authorize("authorizer:devise", (headerName, headerValue) => {
        const headers = {};
        headers[headerName] = headerValue;
        const payload = {
          url:`${config.apiHost}/custom/unique_check`,
          data,
          headers,
          type:"POST"
        };

        Ember.$
          .ajax(payload)
          .always(response => res(response.unique));
      });
    });
  },

  _setupSubject(){
    if(Ember.isPresent(this.subject)){
      return;
    }

    this.subject = new Rx.Subject();
    this.subject
      .debounce(100)
      .subscribe(async value => {
        let isValid = true;
        if(value !== this.oldValue){
          isValid =  await this._checkUniqueEndpoint(value);
        }

        this.set("isValid", isValid);
      });
  },

  check(value){
    this._setupSubject();
    this.subject.onNext(value);
  }
})
