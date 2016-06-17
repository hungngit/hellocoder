'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.series = [
    {
      Id: new mongoose.Types.ObjectId,
      Name: 'Series A',
      CategoryId: ''
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'Series B',
      CategoryId: ''
    }
  ];
};
