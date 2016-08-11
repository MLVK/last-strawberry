const VALID_RESPONSE = {
  "address_components":[
    {
       "long_name":"418",
       "short_name":"418",
       "types":[
          "street_number"
       ]
    },
    {
       "long_name":"Tremont Street",
       "short_name":"Tremont St",
       "types":[
          "route"
       ]
    },
    {
       "long_name":"South End",
       "short_name":"South End",
       "types":[
          "neighborhood",
          "political"
       ]
    },
    {
       "long_name":"Boston",
       "short_name":"Boston",
       "types":[
          "locality",
          "political"
       ]
    },
    {
       "long_name":"Suffolk County",
       "short_name":"Suffolk County",
       "types":[
          "administrative_area_level_2",
          "political"
       ]
    },
    {
       "long_name":"Massachusetts",
       "short_name":"MA",
       "types":[
          "administrative_area_level_1",
          "political"
       ]
    },
    {
       "long_name":"United States",
       "short_name":"US",
       "types":[
          "country",
          "political"
       ]
    },
    {
       "long_name":"02116",
       "short_name":"02116",
       "types":[
          "postal_code"
       ]
    }
  ],
  "adr_address":"<span class=\"street-address\">418 Tremont St</span>, <span class=\"locality\">Boston</span>, <span class=\"region\">MA</span> <span class=\"postal-code\">02116</span>, <span class=\"country-name\">USA</span>",
  "formatted_address":"418 Tremont St, Boston, MA 02116, USA",
  "geometry":{
    "location":{
       "lat": () => 42.3467625,
       "lng": () => -71.06871519999999
    },
    "viewport":{
       "south":42.34672395,
       "west":-71.069098,
       "north":42.34687814999999,
       "east":-71.0685876
    }
  },
  "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
  "id":"8657135bb304a70e4e43463fae6b02f483498a32",
  "name":"418 Tremont St",
  "place_id":"ChIJQ7GKM3J644kRRLr-htiw1b4",
  "reference":"CpQBgwAAAF0PsDD0Emb32XkImw0uZU90iMyrSNsXAbWV3wdIeLj9hGJR0-UAfhpdX3iv_hhNlrckvWpb-m7yRC-3zllwXgPNRME5RXzBE1HbG8Q3FwcFq_rOHS8UdIOAORw6jhqRbAe6CpTyuFhSv1iptDh0W82I00YcLeldw7S1gi86GTz2PJAsp460wNMnPohmnX0K3BIQJAFPiC4IEa_-XgAOy8uZzRoUiHxKqONU0ORSDbNDgGI1dKkUi7I",
  "scope":"GOOGLE",
  "types":[
    "street_address"
  ],
  "url":"https://maps.google.com/?q=418+Tremont+St,+Boston,+MA+02116,+USA&ftid=0x89e37a72338ab143:0xbed5b0d886feba44",
  "utc_offset":-240,
  "vicinity":"Boston",
  "html_attributions":[

  ]
};

const INVALID_REPONSE_MISSING_STREET_INFO = {
  "address_components":[
    {
       "long_name":"South End",
       "short_name":"South End",
       "types":[
          "neighborhood",
          "political"
       ]
    },
    {
       "long_name":"Boston",
       "short_name":"Boston",
       "types":[
          "locality",
          "political"
       ]
    },
    {
       "long_name":"Suffolk County",
       "short_name":"Suffolk County",
       "types":[
          "administrative_area_level_2",
          "political"
       ]
    },
    {
       "long_name":"Massachusetts",
       "short_name":"MA",
       "types":[
          "administrative_area_level_1",
          "political"
       ]
    },
    {
       "long_name":"United States",
       "short_name":"US",
       "types":[
          "country",
          "political"
       ]
    },
    {
       "long_name":"02116",
       "short_name":"02116",
       "types":[
          "postal_code"
       ]
    }
  ],
  "adr_address":"<span class=\"street-address\">418 Tremont St</span>, <span class=\"locality\">Boston</span>, <span class=\"region\">MA</span> <span class=\"postal-code\">02116</span>, <span class=\"country-name\">USA</span>",
  "formatted_address":"418 Tremont St, Boston, MA 02116, USA",
  "geometry":{
    "location":{
       "lat": () => 42.3467625,
       "lng": () => -71.06871519999999
    },
    "viewport":{
       "south":42.34672395,
       "west":-71.069098,
       "north":42.34687814999999,
       "east":-71.0685876
    }
  },
  "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
  "id":"8657135bb304a70e4e43463fae6b02f483498a32",
  "name":"418 Tremont St",
  "place_id":"ChIJQ7GKM3J644kRRLr-htiw1b4",
  "reference":"CpQBgwAAAF0PsDD0Emb32XkImw0uZU90iMyrSNsXAbWV3wdIeLj9hGJR0-UAfhpdX3iv_hhNlrckvWpb-m7yRC-3zllwXgPNRME5RXzBE1HbG8Q3FwcFq_rOHS8UdIOAORw6jhqRbAe6CpTyuFhSv1iptDh0W82I00YcLeldw7S1gi86GTz2PJAsp460wNMnPohmnX0K3BIQJAFPiC4IEa_-XgAOy8uZzRoUiHxKqONU0ORSDbNDgGI1dKkUi7I",
  "scope":"GOOGLE",
  "types":[
    "street_address"
  ],
  "url":"https://maps.google.com/?q=418+Tremont+St,+Boston,+MA+02116,+USA&ftid=0x89e37a72338ab143:0xbed5b0d886feba44",
  "utc_offset":-240,
  "vicinity":"Boston",
  "html_attributions":[

  ]
};

export {
  VALID_RESPONSE,
  INVALID_REPONSE_MISSING_STREET_INFO
}
