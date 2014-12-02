
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var request = require('superagent');
var thunkify = require('thunkify');
var Geocoder = require('geocoder');
var geo = thunkify(Geocode);
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
 * Select type of car.
 *
 */

var select = exports.select = function(type) {
  return function(nightmare) {

  };
};

/**
 * Set pick up location (lat & lng).
 *
 * @param {String} location (address)
 * @param {Object} location (lat, lng)
 */

var setPickup = exports.setLocation = function(location) {
  var address = location;
  if (location.lat && location.lng)
    address = reverseGeocode(location.lat, location.lng);
  return function(nightmare) {
    nightmare
      .type('input[name="search"]', address)
      .wait(1000)
      .click('.search-results > ul:nth-child(1) > li > a')
      .wait('.set')
      .wait(500);
  };
};

/**
 * Set drop off location (lat & lng)
 *
 * @param {String} location (address)
 * @param {Object} location (lat, lng)
 */

var setDropoff = exports.setDropoff = function(location) {
  var address = location;
  if (location.lat && location.lng)
    address = reverseGeocode(location.lat, location.lng);
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
 * Private function to reverse geocode lat, lng.
 *
 * @param {Integer} lat
 * @param {Integer} lng
 */

function *reverseGeocode(lat, lng) {
  var geos = yield geo.reverseGeocode(lat, lng);
  return geos.results[0].formatted_address;
}
