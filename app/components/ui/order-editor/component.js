import Ember from "ember";
import downloadFile from "last-strawberry/utils/download-file";
import computed from "ember-computed-decorators";

const { alias, not } = Ember.computed;

export default Ember.Component.extend({
  classNames:       ["section_sales-order_order-editor", "col"],

  pdfGenerator:     Ember.inject.service(),

  company:          alias("model.location.company"),
  isSalesOrder:     alias("model.isSalesOrder"),
  isPurchaseOrder:  not("isSalesOrder"),

  @computed("itemSearchString")
  noMatchesMessage(str) {
    return this.get("isPurchaseOrder")? `Create new item: ${str}`: `Item not found: ${str}`;
  },

  actions: {
    async printOrder() {
      const { url, key } = await this.get('pdfGenerator').generateInvoices([this.get('model')]);
      return downloadFile(url, key);
    },

    createOrderItem(item) {
      this.set("customAddItemResult", undefined);
      this.attrs.createOrderItem(item);
    },

    stashItemSearch(str) {
      this.set("itemSearchString", str);
    },

    onItemSearchKeyDown(obj, keyboard) {
      if(keyboard.code === "Enter" && this.get("isPurchaseOrder") && !obj.highlighted) {
        this.set("showCreateItemModal", true);
      }
    },

    cancelCreateNewItem() {
      this.set("showCreateItemModal", false);
    },

    async requestCreateNewItem(formData) {
      const newItem = await this.attrs.createNewItem(formData);

      this.attrs.createOrderItem(newItem);
      this.set("showCreateItemModal", false);
    }
  }
});
