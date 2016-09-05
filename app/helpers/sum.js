import Ember from "ember";

export function sum(params) {
  let result = 0;
  if(params.length > 0){
    result = params.reduce((acc, cur) => acc + numeral(cur), 0);
  }

  return result;
}

export default Ember.Helper.helper(sum);
