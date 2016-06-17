'use strict';

var _ = require('lodash'),
  config = require('../config'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  crypto = require('crypto'),
  path = require('path'),
  Q = require('q');

// global seed options object
var seedOptions = {};

module.exports.start = function start(options) {
  // Initialize the default seed options
  seedOptions = _.clone(config.seedDB.options, true);
  var insertedData = {
    userTypes: [],
    userStatuses: [],
    articleStatuses: [],
    resources: [],
    tags: [],
    categories: [],
    genders: [],
    series: [],
    users: [],
    articles: []
  }
  Q.when()
  .then(function(){
    require(path.resolve('./app/seeddata/usertype'))(config.seedDB);
    if(!config.seedDB.options.userTypes.length) return;
    var UserType = mongoose.model('UserType');        
    //Insert UserType
    var insertUserTypePromises = config.seedDB.options.userTypes.map(function (userType) {
        let userTypeObj = new UserType(userType);
        return userTypeObj.save()
          .then(userType => insertedData.userTypes.push(userType))
          .catch(err => console.log(err));
    });
    return Q.all(insertUserTypePromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/userstatus'))(config.seedDB);
    if(!config.seedDB.options.userStatuses.length) return;
    var UserStatus = mongoose.model('UserStatus');        
    //Insert UserStatus
    var insertUserStatusPromises = config.seedDB.options.userStatuses.map(function (userStatus) {
        let userStatusObj = new UserStatus(userStatus);
        return userStatusObj.save()
          .then(userStatus => insertedData.userStatuses.push(userStatus))
          .catch(err => console.log(err));
    });
    return Q.all(insertUserStatusPromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/articlestatus'))(config.seedDB);
    if(!config.seedDB.options.articleStatuses.length) return;
    var ArticleStatus = mongoose.model('ArticleStatus');        
    //Insert ArticleStatus
    var insertArticleStatusPromises = config.seedDB.options.articleStatuses.map(function (articleStatus) {
        let articleStatusObj = new ArticleStatus(articleStatus);
        return articleStatusObj.save()
          .then(articleStatus => insertedData.articleStatuses.push(articleStatus))
          .catch(err => console.log(err));
    });
    return Q.all(insertArticleStatusPromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/resource'))(config.seedDB);
    if(!config.seedDB.options.resources.length) return;
    var Resource = mongoose.model('Resource');        
    //Insert Resource
    var insertResourcePromises = config.seedDB.options.resources.map(function (resource) {
        let resourceObj = new Resource(resource);
        return resourceObj.save()
          .then(resource => insertedData.resources.push(resource))
          .catch(err => console.log(err));
    });
    return Q.all(insertResourcePromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/tag'))(config.seedDB);
    if(!config.seedDB.options.tags.length) return;
    var Tag = mongoose.model('Tag');        
    //Insert Tag
    var insertTagPromises = config.seedDB.options.tags.map(function (tag) {
        let tagObj = new Tag(tag);
        return tagObj.save()
          .then(tag => insertedData.tags.push(tag))
          .catch(err => console.log(err));
    });
    return Q.all(insertTagPromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/category'))(config.seedDB);
    if(!config.seedDB.options.categories.length) return;
    var Category = mongoose.model('Category');        
    //Insert Category
    var insertCatPromises = config.seedDB.options.categories.map(function (category) {
        let categoryObj = new Category(category);
        return categoryObj.save()
          .then(category => insertedData.categories.push(category))
          .catch(err => console.log(err));
    });
    return Q.all(insertCatPromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/gender'))(config.seedDB);
    if(!config.seedDB.options.genders.length) return;
    var Gender = mongoose.model('Gender');        
    //Insert Gender
    var insertGenderPromises = config.seedDB.options.genders.map(function (gender) {
        let genderObj = new Gender(gender);
        return genderObj.save()
          .then(gender => insertedData.genders.push(gender))
          .catch(err => console.log(err));
    });
    return Q.all(insertGenderPromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/series'))(config.seedDB);
    if(!config.seedDB.options.series.length) return;
    var Series = mongoose.model('Series');        
    //Insert Series
    var insertSeriesPromises = config.seedDB.options.series.map(function (series) {
        series.CategoryId = insertedData.categories[0].Id;
        let seriesObj = new Series(series);
        return seriesObj.save()
          .then(series => insertedData.series.push(series))
          .catch(err => console.log(err));
    });
    return Q.all(insertSeriesPromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/user'))(config.seedDB);
    if(!config.seedDB.options.users.length) return;
    var User = mongoose.model('User');        
    //Insert User
    var insertUserPromises = config.seedDB.options.users.map(function (user) {
        user.Gender = insertedData.genders[0].Id;
        user.UserType = insertedData.userTypes[0].Id;
        user.Status.Id = insertedData.userStatuses[0].Id;        
        let userObj = new User(user);
        return userObj.save()
          .then(user => insertedData.users.push(user))
          .catch(err => console.log(err));
    });
    return Q.all(insertUserPromises);
  })
  .then(function(){
    require(path.resolve('./app/seeddata/article'))(config.seedDB);
    if(!config.seedDB.options.articles.length) return;
    var Article = mongoose.model('Article');        
    //Insert Article
    var insertArticlePromises = config.seedDB.options.articles.map(function (article) {
      article.Status = {
        Id: insertedData.articleStatuses[0].Id,
        CreatedBy: insertedData.users[0].Id,
      };
      article.Comments[0].CreatedBy = insertedData.users[0].Id;
      article.Comments[1].CreatedBy = insertedData.users[0].Id;

      article.Votes[0].CreatedBy = insertedData.users[0].Id;
      article.Votes[1].CreatedBy = insertedData.users[0].Id;

      article.Tags[0].Tag = insertedData.tags[0].Id;
      article.Tags[1].Tag = insertedData.tags[1].Id;

      article.Category = insertedData.categories[0].Id;
      article.Series = insertedData.series[0].Id;

      article.History.CreatedBy = insertedData.users[0].Id;
      article.History.UpdatedBy = insertedData.users[0].Id;

      let articleObj = new Article(article);
      return articleObj.save()
        .then(article => insertedData.articles.push(article))
        .catch(err => console.log(err));
    });
    return Q.all(insertArticlePromises);
  })
  .done();
  
};
