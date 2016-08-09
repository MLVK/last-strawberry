const DEFAULT_ADDRESS_MAP = {
  street_number: 'streetNumber',
  route: 'streetName',
  locality: 'city',
  administrative_area_level_1: 'state',
  postal_code: 'zip'
};

const placeToChangeset = place => {
  const mapped = Object.keys(DEFAULT_ADDRESS_MAP)
    .map(key => {
      return place.address_components
        .map(c => {
          const hasMatch = c.types.any(type => key === type);
          if(hasMatch) {
            return { [DEFAULT_ADDRESS_MAP[key]] : c.short_name }
          } else {
            return {};
          }
        });
    })

  const flattened = R.mergeAll(R.flatten(mapped));

  const street = `${flattened.streetNumber} ${flattened.streetName}`,
        lat = place.geometry.location.lat(),
        lng = place.geometry.location.lng();

  return Object.assign(flattened, { street, lat, lng});
}

export {
  placeToChangeset
};
