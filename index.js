
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

  };
};

/**
 * Set pick up location (lat & lng).
 *
 * @param {Int} lat
 * @param {Int} lng
 */

var setPickup = exports.setLocation = function(lat, lng) {
  return function(nightmare) {

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
 * Set drop off location (lat & lng)
 *
 * @param {Int} lat
 * @param {Int} lng
 */

var setDropoff = exports.setDropoff = function(lat, lng) {
  return function(nightmare) {
    // WIP
  };
};

/**
 * Call Uber
 *
 */

var call = exports.call = function() {
  return function(nightmare) {

  };
};
