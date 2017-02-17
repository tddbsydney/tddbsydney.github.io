"use strict";

// -------------------------------------
//   Dependencies
// -------------------------------------
/** 
  * @plugins
  * require("jquery");
  * require("velocity");
  * require("fastclick");
**/

// base
require("./base/raf");
require("./base/print");
require("./base/query");
require("./base/promise");
require("./base/debounce");
require("./base/template");

// services
/* empty block */

// directives
/* empty block */

// components
var PromoVideo = require("./components/promo-video.component");

// controllers
/* empty block */

// config
var CONFIG = require("./config");
console.log("CONFIG options are:");
console.log(CONFIG);

// -------------------------------------
//   App
// -------------------------------------
/** 
  * @name app
  * @desc The main js file that contains the 
          run options and functions for the app.
**/

(function() {
  console.log("app.js loaded.");

  /** 
    * @name App
    * @desc the main class for the app
    * @return {Object} - the instance of the app class
  **/
  function App() {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    var _promoVideos = []; // array to hold reference to all the promo videos
    var _hasFastClickAttached = false; // flag to indicate if fast click was attached

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    /* empty block */

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    // @name _attachFastClick
    // @desc function to attach fast click to the document
    // @param {Event} event - the event the function was dispatched from
    function _attachFastClick(event) { 
      try { FastClick.attach(document.body); } // try to attach fast click
      catch(error) { console.log(error); } // catch attach fast click error
    }

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name init
    // @desc init function to initialize the app
    function init() {
      console.log("app.js: init() called.");

      // instantiate FastClick on the body for eliminating
      // the 300ms delay between a physical tap and the 
      // firing of a click event on mobile browsers
      if (!_hasFastClickAttached && "addEventListener" in document) {
        document.addEventListener("DOMContentLoaded", _attachFastClick, false);
        _hasFastClickAttached = true; // set attached flag as true
      }

      // initiate the promo videos
      query(".promo-video").forEach(function(element, index){
        _promoVideos.push(new PromoVideo({ element: element }));
      });
    }

    // @name destory
    // @desc destory function to destroy the app
    function destroy() { }

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    /* empty block */

    // ---------------------------------------------
    //   Instance block
    // ---------------------------------------------
    return {
      init: init, // init function for the controller
      destroy: destroy // destory function for the controller
    };
  }

  // ---------------------------------------------
  //   Export block
  // ---------------------------------------------
  var ddbWebsite = new App();

  // ---------------------------------------------
  //   Run block
  // ---------------------------------------------
  ddbWebsite.init(); // initiate the created app

})();