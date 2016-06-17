'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.tags = [
    {
      Id: new mongoose.Types.ObjectId,
      Name: 'NodeJS'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'HTML'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'CSS'
    },{
      Id: new mongoose.Types.ObjectId,
      Name: 'Javascript'
    }
  ];
};
