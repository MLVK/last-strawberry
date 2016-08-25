// @TODO does not use polyline, try to use google maps function
const decodePolyline = raw => {
  raw = raw || "";

  const featureCollection = {
    type: "FeatureCollection",
    features: [polyline.toGeoJSON(raw)]
  };

  return featureCollection;
}

export {
  decodePolyline
}
