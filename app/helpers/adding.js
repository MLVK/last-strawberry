import Ember from "ember";

export function adding(params) {
  let result = 0;
  if(params.length > 0){
    result = params.reduce((sum, cur) => sum + numeral(cur), 0);
  }

  return result;
}

export default Ember.Helper.helper(adding);
