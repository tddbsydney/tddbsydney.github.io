"use strict";

// -------------------------------------
//   Dependencies
// -------------------------------------
/**
  * @plugins
  * require("mobile-detect");
**/

// base
require("./base/query");

// -------------------------------------
//   Config
// -------------------------------------
/**
  * @name config
  * @desc The main js file that contains the
          config options and functions for the app.
**/
(function() {
    console.log("config.js loaded.");

    /**
      * @name BuildDetect
      * @desc Class to detect the current build.
      * @param {String} host - the window location host
      * @return {Object} - the instance of the build class
    **/
    function BuildDetect(host) {
        // ---------------------------------------------
        //   Private members
        // ---------------------------------------------
        /* empty block */

        // ---------------------------------------------
        //   Public members
        // ---------------------------------------------
        var bd = this; // to capture the context of this
        bd.isProd = false; // flag turn dev mode on/off ( will be modified by gulp )
        bd.isDeploy = true; // flag turn live mode on/off ( will be modified by gulp )

        // ---------------------------------------------
        //   Private methods
        // ---------------------------------------------
        /* empty block */

        // ---------------------------------------------
        //   Public methods
        // ---------------------------------------------
        // @name isMobile
        // @desc to detect mobile build
        // @return {Boolean} - true or false
        function isMobile() {
            return host.indexOf("m.localhost") != -1
                    || host.indexOf("m.amazonaws") != -1
                    || host.indexOf("m.mcdonalds") != -1
                    || host.indexOf("m.volkswagen") != -1;
        }

        // @name isDesktop
        // @desc to detect desktop build
        // @return {Boolean} - true or false
        function isDesktop() { return !isMobile(); }

        // ---------------------------------------------
        //   Constructor block
        // ---------------------------------------------
        // check if the given host is valid
        if(host == null || typeof host == "undefined") {
            host = window.location.host;
        }

        // ---------------------------------------------
        //   Instance block
        // ---------------------------------------------
        bd.isMobile = isMobile(); // to detect mobile build
        bd.isDesktop = isDesktop(); // to detect desktop build
    }

    /**
      * @name BreakpointDetect
      * @desc Class to detect the current breakpoint.
      * @return {Object} - the instance of the breakpoint class
    **/
    function BreakpointDetect() {
        // ---------------------------------------------
        //   Private members
        // ---------------------------------------------
        /* empty block */

        // ---------------------------------------------
        //   Public members
        // ---------------------------------------------
        var br = this; // to capture the context of this
        br.value = null; // the current breakpoint value

        // flags to indicate various browser breakpoints
        br.isDesktopLarge = false; br.isDesktop = false; // desktop
        br.isTablet = false; br.isTabletSmall = false;   // tablet
        br.isMobile = false; br.isMobileSmall = false;   // mobile

        // ---------------------------------------------
        //   Private methods
        // ---------------------------------------------
        // @name _isMobileSmall, _isMobilem _isTabletSmall,
        // @name _isTablet, _isDesktop, _isDesktopLarge
        // @desc to detect various browser breakpoints
        // @return {Boolean} - true or false
        function _isDesktopLarge() { return  br.value == "desktop-lg-up"; }
        function _isDesktop()      { return  _isDesktopLarge() || br.value == "desktop"; }

        function _isTablet()       { return  _isTabletSmall() || br.value == "tablet"; }
        function _isTabletSmall()  { return  br.value == "tablet-sm"; }

        function _isMobile()       { return  _isMobileSmall() || br.value == "mobile"; }
        function _isMobileSmall()  { return  br.value == "mobile-sm"; }

        // @name _updateValues
        // @desc function to update breakpoint value and flags
        function _updateValues() {
            // update the breakpoint value
            br.value = window.getComputedStyle(query('body')[0], ':before')
                           .getPropertyValue('content').replace(/\"/g, '');

            // update all the breakpoint flags
            if(_isDesktopLarge()) { br.isDesktopLarge = true; } else { br.isDesktopLarge = false; }
            if(_isDesktop()) { br.isDesktop = true; } else { br.isDesktop = false; }

            if(_isTablet()) { br.isTablet = true; } else { br.isTablet = false; }
            if(_isTabletSmall()) { br.isTabletSmall = true; } else { br.isTabletSmall = false; }

            if(_isMobile()) { br.isMobile = true; } else { br.isMobile = false; }
            if(_isMobileSmall()) { br.isMobileSmall = true; } else { br.isMobileSmall = false; }
        }

        // ---------------------------------------------
        //   Public methods
        // ---------------------------------------------
        /* empty block */

        // ---------------------------------------------
        //   Constructor block
        // ---------------------------------------------
        // add window resize event listener
        // to update the breakpoint value and fals
        window.addEventListener("resize", function(event) {
            _updateValues();
        });

        // update the breakpoint value and flags
        // at least once after initialization
        _updateValues();

        // ---------------------------------------------
        //   Instance block
        // ---------------------------------------------
        /* empty block */
    }

    /**
      * @name CONFIG
      * @desc Constant that contains the config options and values for the app.
      * @return {Object} - all the possible config options and values for the app
    **/
    function CONFIG() {
        // ---------------------------------------------
        //   Private members
        // ---------------------------------------------
        var _md = new MobileDetect(navigator.userAgent); // detect mobile
        var _bd = new BuildDetect(window.location.host); // detect build
        var _os = _md.os(); // detect mobile OS

        var _src = "/src/";   // src path
        var _dist = "/dist/"; // dist path
        var _deploy = "";     // deploy path

        var _mcdonalds = ""; // path for mcdonals
        var _volkswagen = ""; // path for volkswagen

        var _url = "/performance"; // app base url path ( to be used with the app root path )
        var _root = window.location.protocol + "//" + window.location.hostname; // app root path

        // ---------------------------------------------
        //   Public members
        // ---------------------------------------------
        var breakpoint = new BreakpointDetect(); // detect breakpoint

        // ---------------------------------------------
        //   Private methods
        // ---------------------------------------------
        /* empty block */

        // ---------------------------------------------
        //   Public methods
        // ---------------------------------------------
        // @name isPhone, isTablet, isMobile, isIOS, isAndroid
        // @desc functions to detect mobile device and os
        // @return {Boolean} - returns true or false
        function isPhone()  { return _md.phone()  != null; } // only phones
        function isTablet() { return _md.tablet() != null || _bd.isMobile; } // only tablets
        function isMobile() { return _md.mobile() != null || _bd.isMobile; } // phones and tablets

        function isIOS() { return _os ? (_os.toLowerCase().indexOf("ios") != -1) : false; } // ios
        function isAndroid() { return _os ? (_os.toLowerCase().indexOf("android") != -1) : false; } // android

        function isIOSOld() { return _os ? (isIOS() && parseFloat(_md.version("iOS")) < 8) : false; } // ios old
        function isAndroidOld() { return _os ? (isAndroid() && parseFloat(_md.version("Android")) < 4.4) : false; } // android old

        // @name getIEVersion
        // @desc function to get internet explorer version
        // @return {Boolean|Number} - returns version number or false
        function getIEVersion() {
            var ua = navigator.userAgent;

            var msie = ua.indexOf("MSIE ");
            if (msie > 0) {
                // IE 10 or older - return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
            }

            var trident = ua.indexOf("Trident/");
            if (trident > 0) {
                // IE 11 - return version number
                var rv = ua.indexOf("rv:");
                return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
            }

            var edge = ua.indexOf("Edge/");
            if (edge > 0) {
                // IE 12 - return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
            }

            // other browsers
            return false;
        }

        // @name isIE
        // @desc function to detect internet explorer
        // @return {Boolean} - returns true or false
        function isIE() {
            try { return parseInt(getIEVersion()) > 0; }
            catch(error) { /*console.log(error);*/ return false; }
        }

        // @name isIEOld
        // @desc function to detect old internet explorer
        // @return {Boolean} - returns true or false
        function isIEOld() {
            try { return parseInt(getIEVersion()) <= 10; }
            catch(error) { /*console.log(error);*/ return false; }
        }

        // @name isLocalHost, isAmazonHost, isMcDonaldsHost, isVolkswagenHost
        // @desc functions to check for the server host environment
        // @return {Boolean} - returns true or false based on environment
        function isLocalHost() { return (window.location.host).indexOf("localhost") != -1;  }
        function isAmazonHost() { return (window.location.host).indexOf("amazonaws") != -1; }
        function isMcDonaldsHost() { return (window.location.host).indexOf("mcdonalds") != -1; }
        function isVolkswagenHost() { return (window.location.host).indexOf("volkswagen") != -1; }

        // @name getUrlPath, getRootPath
        // functions to get the path for app url and root
        // @return {String} - returns the app url and root path
        function getUrlPath() { return _url + (isLocalHost() ? "" : ""); }
        function getRootPath() { return _root + (isLocalHost() ? (":" + window.location.port) : ""); }

        // @name ggetVolkswagenPath
        // functions to get the volkswagen path
        // @return {String} - returns the volkswagen path
        function getVolkswagenPath() {
            if(isVolkswagenHost()) { return ""; }
            else { return "https://au.volkswagen.tribalstage.com"; }
        }

        // @name getViewsPath
        // function to get the path for views
        // @return {String} - returns the path
        function getViewsPath() {
            var viewsPath = "static/views/";
            return !_bd.isProd ? _src + viewsPath : _dist + viewsPath;
        }

        // @name getTemplatesPath
        // function to get the path for templates
        // @return {String} - returns the path
        function getTemplatesPath() {
            var templatesPath = "static/templates/";
            return !_bd.isProd ? _src + templatesPath : _dist + templatesPath;
        }

        // @name getDataPath
        // function to get the path for data
        // @return {String} - returns the path
        function getDataPath() {
            var dataPath = "data/";
            return !_bd.isProd ? _src + dataPath : _dist + dataPath;
        }

        // @name getImagesPath
        // function to get the path for images
        // @return {String} - returns the path
        function getImagesPath() {
            var imagesPath = "assets/images/";
            return !_bd.isProd ? _src + imagesPath : _dist + imagesPath;
        }

        // @name getVideosPath
        // function to get the path for videos
        // @return {String} - returns the path
        function getVideosPath() {
            var videosPath = "assets/videos/";
            return !_bd.isProd ? _src + videosPath : _dist + videosPath;
        }

        // ---------------------------------------------
        //   Constructor block
        // ---------------------------------------------
        // if app is in deployment mode
        if(_bd.isDeploy) {
            if(isMcDonaldsHost()) { _deploy = _mcdonalds; } // if deployed to mcdonalds
            if(isVolkswagenHost()) { _deploy = _volkswagen; } // if deployed to volkswagen
            _src = _dist = _deploy; // all deploy paths are the same ( on every host environment )
            _url = ""; // the url is taken care of by the base href value configured in the gulp framework
        }

        // ---------------------------------------------
        //   Instance block
        // ---------------------------------------------
        return {
            // device
            device: {
                isPhone: isPhone(), // functions to detect mobile device and os
                isTablet: isTablet(), // functions to detect mobile device and os
                isMobile: isMobile(), // functions to detect mobile device and os

                isIOS: isIOS(), // functions to detect mobile device and os
                isAndroid: isAndroid(), // functions to detect mobile device and os

                isIOSOld: isIOSOld(), // functions to detect mobile device and os
                isAndroidOld: isAndroidOld() // functions to detect mobile device and os
            },

            // browser
            browser: {
                isIE: isIE(), // function to detect internet explorer
                isIEOld: isIEOld() // function to detect old internet explorer
            },

            // breakpoint
            breakpoint: breakpoint, // functions to detect the current breakpoint

            // environment
            environment: {
                isProd: _bd.isProd, // functions to check for the server host environment
                isDeploy: _bd.isDeploy, // functions to check for the server host environment

                isLocalHost: isLocalHost(), // functions to check for the server host environment
                isAmazonHost: isAmazonHost(), // functions to check for the server host environment
                isMcDonaldsHost: isMcDonaldsHost(), // functions to check for the server host environment
                isVolkswagenHost: isVolkswagenHost() // functions to check for the server host environment
            },

            // path
            path: {
                url: getUrlPath(), // functions to get the path for app url and root
                root: getRootPath(), // functions to get the path for app url and root
                volkswagen: getVolkswagenPath(), // function to get the volkswagen path

                views: getViewsPath(), // function to get the path for views
                templates: getTemplatesPath(), // function to get the path for templates

                data: getDataPath(), // function to get the path for data
                images: getImagesPath(), // function to get the path for images
                videos: getVideosPath() // function to get the path for videos
            },

            // animation
            animation: {
                // duration and delay
                // used in js animations
                delay: 250, // delay in ms
                duration: 500 // duration in ms
            },

            // timeout
            timeout: {
                // timeouts used for
                // manual scope and
                // animation updates
                scope: 250, // timeout scope in ms
                animation: 550 // timeout animation in ms
            }
        };
    }

    // ---------------------------------------------
    //   Module export block
    // ---------------------------------------------
    // export the module
    module.exports = new CONFIG();

})();
