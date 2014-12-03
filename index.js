
/**
 * Dependencies.
 */

var exec = require('child_process').exec;
var thunkify = require('thunkify');
var Geocoder = require('geocoder');
var geo = thunkify(Geocoder);

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
 * @param {String} type
 */

var select = exports.select = function(type) {
  var mapping = {
    uberpool: 1,
    uberx: 2,
    uberxl: 3,
    blackcar: 4,
    suv: 5,
    taxi: 6
  };
  var nth = mapping[type.toLowerCase()];
  return function(nightmare) {
    nightmare
      .click('div.vehicle-selector > ul >li.nth-child(' + nth + ')')
      .wait(100);
  };
};

/**
 * Set pick up location (lat & lng).
 *
 * @param {String} location (address)
 * @param {Object} location (lat, lng)
 */

var setPickup = exports.setPickup = function *(location) {
  var address = yield getAddress(location);
  return function(nightmare) {
    nightmare
      .type('input[name="search"]', address)
      .wait(1000)
      .click('.search-results > ul:nth-child(1) > li > a')
      .wait('.set')
      .wait(500)
      .click('.set');
  };
};

/**
 * Set drop off location (lat & lng)
 *
 * @param {String} location (address)
 * @param {Object} location (lat, lng)
 */

var setDropoff = exports.setDropoff = function *(location) {
  var address = yield getAddress(location);
  return function(nightmare) {
    nightmare
      .exists('a.btn', function(ready) {
        if (!ready) throw 'Set drop off box not ready';
        return;
      })
      .click('a.btn')
      .type('input[name="search"]', address)
      .click('.search-results > ul:nth-child(1) > li > a')
      .wait('a.accept')
      .wait(500);
  };
};

/**
 * Get fare estimates.
 *
 * @param {Function} callback
 */

var getFare = exports.getFare = function(callback) {
  return function(nightmare) {
    nightmare
      .click('a.fare-quote')
      .evaluate(function() {
      }, function(fare) {
        callback(fare);
      });
  };
};

/**
 * Call Uber
 *
 * TODO: improve
 */

var call = exports.call = function() {
  return function(nightmare) {
    nightmare
      .exists('a.accept', function(ready) {
        if (!ready) throw 'Unable to call Uber.';
        return;
      })
      .click('a.accept');
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

/**
 * Private function to get address from location.
 *
 * @param {String or Object} location
 */

function *getAddress(location) {
  var address = location;
  if (location.lat && location.lng)
    address = yield reverseGeocode(location.lat, location.lng);
  return address;
}
