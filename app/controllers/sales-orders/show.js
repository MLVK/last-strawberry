import Ember from "ember";
import computed from "ember-computed-decorators";
const { gt } = Ember.computed;

export default Ember.Controller.extend({
  firebaseMgr: Ember.inject.service(),

  cleanup() {
    if(this.locationItemMetaStream !== undefined){
      this.locationItemMetaStream.onCompleted();
    }
  },

  processSnapshot(snapshot) {
    const data = snapshot.val();

    if(Ember.isPresent(data)){
      this.set('loadingFbData', false);
      this.set('rawSalesData', _.map(data));
    }
  },

  willDestroy() {
    this.cleanup();
  },

  @computed("items.@each.{isSold,active}", "model.orderItems.[]")
  filteredItems(items, orderItems) {
    return items.filter(item => {
      const matchingOrderItem = orderItems.any(oi => oi.get("item.id") === item.get("id"));

      return item.get("isSold") && item.get("active") && !matchingOrderItem;
    });
  },

  @computed("rawSalesData.@each.{ts}")
  salesData(dataPoints = []) {
    return dataPoints.sortBy('ts');
  },

  hasSalesData: gt("salesData.length", 0),

  loadSalesData() {
    this.cleanup();

    const itemCode = this.get('item.code'),
          locationCode = this.get('model.location.code'),
          dataPath = `locations/${locationCode}/${itemCode}`,
          fbRef = this.get('firebaseMgr').buildRef(dataPath).orderByChild('ts').limitToLast(10);

    this.locationItemMetaStream = new Rx.Subject();

    this.locationItemMetaStream
      .subscribe(
        () => fbRef.on('value', ::this.processSnapshot, this.errorHander, this),
        () => {},
        () => fbRef.off('value', ::this.processSnapshot, this));

    this.locationItemMetaStream.onNext();
  },

  actions: {
    onOrderItemChange(item) {
      this.set("item", item);
      this.loadSalesData();
    }
  }
});
