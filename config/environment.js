/* jshint node: true */

module.exports = function(environment) {

  var ENV = {
    modulePrefix: 'last-strawberry',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },

      LOG_STACKTRACE_ON_DEPRECATION: false
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['apiHost'] = process.env.API_HOST;

  ENV['routificApi'] = {
    accessToken: process.env.ROUTIFIC_API_KEY,
  };

  ENV['quoteApi'] = {
    accessToken: process.env.QUOTE_SERVICE_KEY,
  };

  ENV['firebase'] = {
    host: process.env.FIREBASE_URL
  };

  ENV['place-autocomplete'] = {
    exclude: true,
    key: process.env.GOOGLE_API_KEY,
    client: process.env.GOOGLE_CLIENT_ID
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'sales-orders',
    routeIfAlreadyAuthenticated: 'sales-orders'
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'frame-src': "*.firebaseio.com",
    'script-src': "'self' 'unsafe-eval' *.firebaseio.com http://laststrawberry.dev:* http://admin.dev:* https://cdn.mxpnl.com  *.googleapis.com *.cloudflare.com", // Allow scripts from https://cdn.mxpnl.com
    'font-src': "'self' data: *.gstatic.com *.googleapis.com", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "'self' https://andruxnet-random-famous-quotes.p.mashape.com wss://s-usc1c-nss-102.firebaseio.com ws://laststrawberry.dev:* ws://admin.dev:* http://localhost:3000 https://routific.com *.googleapis.com *.mapbox.com", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
    'img-src': "'self' *.googleapis.com data: *.basemaps.cartocdn.com *.gstatic.com",
    'style-src': "'self' 'unsafe-inline' *.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "'self'"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.apiHost = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    // This breaks clicks on elements rendered via ember wormhole in testing
    // ENV.APP.rootElement = '#ember-testing';

    ENV.apiHost = '';

    ENV["firebase"] = {
      host: "https://last-strawberry-testing.firebaseio.com/"
    }
  }

  if (environment === 'production') {

  }

  return ENV;
};
