import { moduleFor, test } from 'ember-qunit';

moduleFor('route:customers/show/location', 'Unit | Route | customers/show/location', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

// test('updateItemDesires updates the collection correctly', function(assert) {
//   let route = this.subject();
//
//   const updatedCollection = Immutable.fromJS([
//     {id:1, text:'label 1', enabled:true},
//     {id:2, text:'label 2', enabled:false},
//     {id:3, text:'label 3', enabled:true}
//   ]);
//
//   const processedCollection = Immutable.fromJS(route.actions.updateItemDesires(updatedCollection.toJS()));
//
//   assert.ok(updatedCollection.equals(processedCollection), "Something doesn't match in the output");
// });
