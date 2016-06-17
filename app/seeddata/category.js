'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.categories = [
    {
      Id: new mongoose.Types.ObjectId,
      Name: 'Category A'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'Category B'
    }
  ];
};
