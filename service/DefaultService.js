'use strict';


/**
 * Get a list of cities with current weather info
 * By passing in the appropriate options, you can search for available inventory in the system 
 *
 * returns List
 **/
exports.getAllWeathers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "cityName" : "London",
  "cityCode" : "sv2-12r-fss-vx2",
  "temperature" : 24.5
}, {
  "cityName" : "London",
  "cityCode" : "sv2-12r-fss-vx2",
  "temperature" : 24.5
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get current weather in a single city identified by cityId paramter
 *
 * cityId Integer Unique city code identifier
 * returns CityWeather
 **/
exports.getSingleCityWeather = function(cityId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "cityName" : "London",
  "cityCode" : "sv2-12r-fss-vx2",
  "temperature" : 24.5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

