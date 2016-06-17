'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.userStatuses = [
    {
      Id: new mongoose.Types.ObjectId,
      Name: 'Active'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'InActive'
    }
  ];
};
