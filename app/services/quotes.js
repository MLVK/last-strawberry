import Ember from "ember";
import config from 'last-strawberry/config/environment';

const {
  run
} = Ember;

const {
  alias
} = Ember.computed;

const SUBJECTS = [
  "movies",
  "famous"
];

export default Ember.Service.extend({
  quote: alias("current.quote"),
  author: alias("current.author"),

  init(){
    this.refreshQuote();
  },

  async refreshQuote(){
    const headers = {
      "X-Mashape-Key":config.quoteApi.accessToken,
      "Content-Type":"application/x-www-form-urlencoded",
      "Accept":"application/json"
    };

    const subject = SUBJECTS[_.random(0, SUBJECTS.length - 1)];

    const payload = {
      url: `https://andruxnet-random-famous-quotes.p.mashape.com/cat=${subject}`,
      method: "POST",
      headers:headers
    };

    const quoteJSON = await Ember.$.ajax(payload);

    run(() => this.set("current", JSON.parse(quoteJSON)));
  }
});
