'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.userTypes = [
    {
      Id: new mongoose.Types.ObjectId,
      Name: 'Admin'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'User'
    }
  ];
};
