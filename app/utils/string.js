const toUnderscore = value => {
  return value.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);
}

export {
  toUnderscore
}
