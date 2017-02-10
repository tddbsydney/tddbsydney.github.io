'use strict';

// -------------------------------------
//   Gulp - Config
// -------------------------------------
/**
  * @name config
  * @desc The main js file that contains the
          gulp config options for the app.
**/

// -----------------------
// GLOBAL CONFIG VARIABLE
// -----------------------
var config = {
    // flags for gulp mode
    // ( and mode options )
    mode: {
        isProd: false, // turn production mode on/off,
        isDeploy: false, // turn deployment mode on/off

        isMapped: true, // turn creating source maps on/off
        isWatched: true, // turn watchers on files, assets on/off
        isStripped: false, // turn stripping comments, logs on/off

        hasPHP: false, // turn creating php index file on/off
        hasASPX: true, // turn creating aspx index file on/off
        hasPartial: false // turn creating partial index file on/off
    },

    // files to exclude while
    // wiring dependencies
    // ( uses regex )
    exclude: [],

    // locations of source
    // files and folders
    files: {
        // root
        root: {
            dev: "_src/assets/", // for development files
            prod: "_src/_compiled_assets/", // for compiled production files
            deploy: "_site/assets/", // for compiled deployment files
        },

        // for styles
        styles: {
            sass: "sass/", // for sass
            main: "sass/app.scss", // the main sass file

            css: "css/", // for compiled css
            dependencies: "css/dependencies/" // for compiled dependencies
        },

        // for scripts
        scripts: {
            js: "js/", // for js
            main: "js/app.js", // the main js file
            config: "js/config.js", // the config js file
            dependencies: "js/dependencies/" // for compiled dependencies
        },

        // for data
        data: "data/",

        // for assets
        assets: {
            fonts : "fonts/", // for fonts
            icons : "icons/", // for icons
            images: "images/", // for images
            videos: "videos/" // for videos
        }
    },

    // options to be used
    // while creating fonts
    // from the given svg icons
    icons: {
        // font name
        name: "icons-ddb-website",

        className: "icon__ddbw", // scss class prefix
        fileName: "_icons.scss", // icon file name

        fontPath: "../assets/fonts/", // relative font path
        stylePath: "../../sass/base/", // relative scss path
        formats: ['svg', 'ttf', 'eot', 'woff'] // icon formats
    },

    // option for the webserver used to serve
    // files in local / deploy environment
    server: {
        open: true, // flag to open browser
        port: 8000,  // port of the webserver
        https: false, // flag to use https in the url
        livereload: true // flag for reloading browser
    }
};

// -------------------------------
// GLOBAL ARRAY TO STORE WATCHERS
// -------------------------------
var watchers = [];

// -----------------------------------------
// OBJECTS ? FUNCTION EXPOSED TO THE MODULE
// -----------------------------------------
module.exports = {
    // function to get the
    // config json object
    getConfig: function() {
        return config;
    },

    // function to get the
    // watchers array
    getWatchers: function() {
        return watchers;
    }
};

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------