import Ember from "ember";
import downloadFile from "last-strawberry/utils/download-file";
import computed from "ember-computed-decorators";
import ItemValidations from "last-strawberry/validators/item";

const {
  alias,
  not
} = Ember.computed;

export default Ember.Component.extend({
  session:     Ember.inject.service(),

  classNames:       ["section_sales-order_order-editor", "col"],

  pdfGenerator:     Ember.inject.service(),

  company:          alias("model.location.company"),
  isSalesOrder:     alias("model.isSalesOrder"),
  isPurchaseOrder:  not("isSalesOrder"),

  @computed("session")
  validators(session) {
    return ItemValidations(session);
  },

  @computed("itemSearchString")
  noMatchesMessage(str = "") {
    return this.get("isPurchaseOrder")? `Create new item: ${str}`: `Item not found: ${str}`;
  },

  @computed("model.orderItems.@each.{isDeleted}")
  validOrderItems(orderItems) {
    return orderItems
      .filter(o => !o.get("isDeleted"));
  },

  actions: {
    async printOrder() {
      const { url, key } = await this.get("pdfGenerator").generateInvoices([this.get("model")]);
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

        const stashedItemData= {
          name: this.get("itemSearchString"),
          company: this.get("company"),
          position: 0
        }

        this.set("stashedItemData", stashedItemData);
        this.set("showCreateItemModal", true);
      }
    },

    cancelCreateNewItem() {
      this.set("showCreateItemModal", false);
    },

    async requestCreateNewItem(changeset) {
      const newItem = await this.attrs.createNewItem(changeset);

      this.attrs.createOrderItem(newItem);
      this.set("showCreateItemModal", false);
    }
  }
});
