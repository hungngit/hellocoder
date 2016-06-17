'use strict';

/**
 * Module dependencies
 */
var moment = require('moment'),
  path = require('path'),
  cu = require(path.resolve('./app/lib/commonutil')),
  errorHandler = require(path.resolve('./app/controllers/core/errors.server.controller')),
  mongoose = require('mongoose'),
  articleService = require(path.resolve('./app/services/article'));

/**
 * getListFromDateAndStatus
 */
exports.getListFromDateAndStatus = function (req, res) {
  let params = {
    fromDate: moment(req.query.fromDate),
    //statusId: req.query.statusId,
    limit: cu.isInteger(req.query.limit) ? cu.convertToInt(req.query.limit) : 10 
  };
  articleService.getListFromDateAndStatus(params.fromDate, params.statusId)
  .then(articles => cu.createSuccessJsonResult(res, articles))
  .catch(err => cu.createErrorJsonResult(res, 'Fail', err, 500));
};
