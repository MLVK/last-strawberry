import {
  buildList,
  make
} from "ember-data-factory-guy";

const buildRouteVisitesWithCompany = count => {
  const company = make("company");
  const address = make("address");
  const location = make("location", {company, address});

  return buildList("route-visit", count, {address: location.get("address").content});
}

export {
  buildRouteVisitesWithCompany
}
