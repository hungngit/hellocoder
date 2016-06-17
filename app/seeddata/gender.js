'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.genders = [
    {
      Id: new mongoose.Types.ObjectId,
      Name: 'Male'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'Female'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'Other'
    }
  ];
};
