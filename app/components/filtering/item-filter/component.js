import Ember from "ember";

export default Ember.Component.extend({
  actions: {
    itemSelected(items){
      this.set("selectedItems", items);
      if(this.attrs.itemSelected){
        this.attrs.itemSelected(items);
      }
    }
  }
});
