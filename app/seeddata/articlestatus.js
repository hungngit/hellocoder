'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.articleStatuses = [
    {
      Id: new mongoose.Types.ObjectId,
      Name: 'Pending'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'Approved'
    }
  ];
};
