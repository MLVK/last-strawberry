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
