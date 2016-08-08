const toPercentage = value => {
  const valueNumber = parseFloat(value) || 0;
  const percentage = R.clamp(0, 1, valueNumber);
  return percentage;
}

export {
  toPercentage
}
