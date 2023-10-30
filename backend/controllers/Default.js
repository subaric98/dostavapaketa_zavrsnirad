'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.dostavaGET = function dostavaGET (req, res, next) {
  Default.dostavaGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dostavaIdDELETE = function dostavaIdDELETE (req, res, next, id) {
  Default.dostavaIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dostavaIdGET = function dostavaIdGET (req, res, next, id) {
  Default.dostavaIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dostavaIdPUT = function dostavaIdPUT (req, res, next, body, id) {
  Default.dostavaIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.dostavaPOST = function dostavaPOST (req, res, next, body) {
  Default.dostavaPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
