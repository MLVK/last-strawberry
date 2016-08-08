/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.decorators', 'es7.functionBind'],
      includePolyfill: true
    },
    dotEnv: {
      clientAllowedKeys: ['GOOGLE_API_KEY', 'ROUTIFIC_API_KEY']
    },
    'ember-cli-qunit': {
      useLintTree: false
    },
    fingerprint: {
      exclude: [
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/lodash/dist/lodash.min.js');
  app.import('bower_components/dragula.js/dist/dragula.min.js');
  app.import('bower_components/dragula.js/dist/dragula.min.css');
  app.import('bower_components/string/dist/string.min.js');
  app.import('bower_components/numeral/min/numeral.min.js');
  app.import('bower_components/rxjs/dist/rx.all.min.js');
  app.import('bower_components/immutable/dist/immutable.min.js');
  app.import('bower_components/gsap/src/minified/TweenMax.min.js');
  app.import('bower_components/gsap/src/minified/easing/EasePack.min.js');
  app.import('bower_components/firebase/firebase.js');
  app.import('bower_components/ramda/dist/ramda.min.js');

  app.import('bower_components/mlvk-google-fonts/opensans/OpenSans-Bold.ttf', {
    destDir: 'assets'
  });

  app.import('bower_components/mlvk-google-fonts/opensans/OpenSans-Light.ttf', {
    destDir: 'assets'
  });

  app.import('bower_components/mlvk-google-fonts/opensans/OpenSans-Regular.ttf', {
    destDir: 'assets'
  });

  app.import('bower_components/mlvk-google-fonts/iconfont/MaterialIcons-Regular.ttf', {
    destDir: 'assets'
  });

  app.import('bower_components/mlvk-google-fonts/iconfont/MaterialIcons-Regular.woff', {
    destDir: 'assets'
  });

  app.import('bower_components/mlvk-google-fonts/iconfont/MaterialIcons-Regular.woff2', {
    destDir: 'assets'
  });

  app.import('bower_components/mlvk-google-fonts/iconfont/material-icons.css');

  return app.toTree();
};
