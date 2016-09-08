import Ember from "ember";
import { toPercentage } from "last-strawberry/utils/math";

export default Ember.Component.extend({
  classNames: ["item-desires", "col", "wrap"],
  massCreditRate: "",
  massDesire: false,

  actions:{
    massApplyCreditRate(){
      this.attrs.massApplyCreditRate(toPercentage(this.get("massCreditRate")));
      this.set("massCreditRate", "");
    },

    massApplyDesire() {
      const massDesire = !this.get("massDesire");
      this.set("massDesire", massDesire);
      this.attrs.massApplyDesire(massDesire);
    }
  }
});
