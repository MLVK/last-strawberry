const DEFAULT_ADDRESS_MAP = {
  street_number: 'streetNumber',
  route: 'streetName',
  locality: 'city',
  administrative_area_level_1: 'state',
  postal_code: 'zip'
};

const placeToObject = place => {
  const components = place.address_components || [];
  const mapped = Object.keys(DEFAULT_ADDRESS_MAP)
    .map(key => {
      return components
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

  delete flattened.streetNumber;
  delete flattened.streetName;
  return Object.assign(flattened, { street, lat, lng });
}

export {
  placeToObject
};
