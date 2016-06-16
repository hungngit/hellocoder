var mongoose = require("mongoose"),
ResourceModel = require("../models/resource");

ResourceModel.statics.findResourceName = function (resourceName, callback) {
  var _this = this;
  resourceName = resourceName.toLowerCase();

  _this.findOne({
    ResourceName: resourceName
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(resourceName);
      }
    } else {
      callback(null);
    }
  });
};