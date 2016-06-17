'use strict';
var mongoose = require("mongoose");

module.exports = function (seedDB) {
  seedDB.options.articles = [];
  for(let i=0; i<30; i++){
    seedDB.options.articles.push({
      Id: new mongoose.Types.ObjectId,
      Title: 'Article ' + i.toString(),
      Content: 'Article ' + i.toString(),
      ContentHtml: '<strong>Article</strong> ' + i.toString(),
      Status: {
        Id: '',
        CreatedBy: ''
      },
      Comments: [{
          Content: 'Comments 1',
          CreatedBy: ''
        },{
          Content: 'Comments 1 <span>123</span>',
          CreatedBy: ''
      }],
      AverageVote: 4.5,
      Votes: [{
          Star: 4,
          CreatedBy: '',
        },{
          Star: 5,
          CreatedBy: '',
      }],
      Tags: [{
        Tag: '',
      },{
        Tag: ''
      }],
      Category: '',
      Series: '',
      History: {
        CreatedBy: '',
        UpdatedBy: '',
      }
    });
  }
};
