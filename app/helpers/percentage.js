import Ember from 'ember';

export function percentage(params) {
  const value = params[0];

  if(value){
    return numeral(value).format('0 %');
  } else {
    return '0 %';
  }
}

export default Ember.Helper.helper(percentage);
