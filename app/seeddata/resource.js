'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.resources = [
    {
      Id: new mongoose.Types.ObjectId,
      Code: 'CODE_A',
      Value: 'Value A',
      Type: 'String',
      CultureCode: 'EN'
    },{
      Id: new mongoose.Types.ObjectId,
      Code: 'CODE_B',
      Value: 'Value B',
      Type: 'String',
      CultureCode: 'EN'
    }
  ];
};
