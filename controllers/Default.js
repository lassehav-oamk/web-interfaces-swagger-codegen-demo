'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.getAllWeathers = function getAllWeathers (req, res, next) {
  Default.getAllWeathers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSingleCityWeather = function getSingleCityWeather (req, res, next) {
  var cityId = req.swagger.params['cityId'].value;
  Default.getSingleCityWeather(cityId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.testOp = function testOp(req, res, next) {
  utils.writeJson(res, utils.respondWithCode(200));

};
