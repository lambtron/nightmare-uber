
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var request = require('superagent');
var fs = require('fs');

/**
 * Login to an Uber account.
 *
 * @param {String} email
 * @param {String} password
 */

var login = exports.login = function(email, password){
  return function(nightmare) {
    nightmare
      .viewport(800, 1600)
      .goto('https://m.uber.com/')
      .wait('a.done')
      .wait(1000)
      .type('#email', email)
      .type('#password', password)
      .click('a.done')
      .wait('.show-eta')
      .wait(10000)
      .evaluate(function() {
        var overlay = document.querySelector('.dialog-overlay');
        var parent = overlay.parentNode;
        parent.removeChild(overlay);
      }, function() {
      });
  };
};

/**
 * Set pick up location (lat & lng).
 *
 * @param {String} location
 * @param {Object} location
 */

var setPickup = exports.setLocation = function(location) {
  return function(nightmare) {
    // Need to figure out how to dynamically set geolocation.
  };
};

/**
 * Set drop off location (lat & lng)
 *
 * @param {Int} lat
 * @param {Int} lng
 */

var setDropoff = exports.setDropoff = function(lat, lng) {
  return function(nightmare) {
    // Need to figure out how to dynamically set geolocation.
  };
};

/**
 * Select type of car.
 *
 */

var select = exports.select = function(type) {
  return function(nightmare) {

  };
};

/**
 * Call Uber
 *
 */

var call = exports.call = function() {
  return function(nightmare) {
    // Make sure pick up and drop off locations are set.
  };
};

/**
 * Private function to inject fake geolocation into browser.
 *
 * @param {[type]} self
 * @param {[type]} latitude
 * @param {[type]} longitude
 */

var addFakeGeolocation = function(self, latitude, longitude) {
  self.evaluate(function() {
    window.navigator.geolocation = function() {
      var pub = {};
      var current_pos = {
        coords: {
          latitude: window.__casper_params__.latitude,
          longitude: window.__casper_params__.longitude
        }
      };
      pub.getCurrentPosition = function(locationCallback, errorCallback) {
        locationCallback(current_pos);
      };
      return pub;
    }();
  }, { latitude: latitude, longitude: longitude });
};
