'use strict';

/**
 * Module dependencies
 */
var moment = require('moment'),
  path = require('path'),
  cu = require(path.resolve('./app/lib/commonutil')),
  errorHandler = require(path.resolve('./app/controllers/core/errors.server.controller')),
  resourceService = require(path.resolve('./app/services/resource'));

/**
 * getListFromDateAndStatus
 */
exports.getListByCultureCode = function (req, res) {
  let params = {
    cultureCode: req.query.cultureCode
  };
  resourceService.getResourceByCultureCode(params.cultureCode)
  .then(resources => cu.createSuccessJsonResult(res, resources))
  .catch(err => cu.createErrorJsonResult(res, 'Fail', err, 500));
};
