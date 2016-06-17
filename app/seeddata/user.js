'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  var selfId = new mongoose.Types.ObjectId;
  seedDB.options.users = [
    {
      Id: selfId,
      UserName: 'vietpham',
      FirstName: 'Viet',
      LastName: 'Pham',
      Gender: '',
      Email: 'phamhoangviet88@gmail.com',
      MobileCode: '+84',
      MobilePhone: '0906954098',
      UserType: '',
      Status: {
        Id: '',
        CreatedBy: selfId
      }
    }
  ];
};
