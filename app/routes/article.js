'use strict';
var path = require('path');

module.exports = function (app) {
  // User Routes
  var articleCtrl = require(path.resolve('./app/controllers/article/article'));

  // Setting up the users profile api
  app.route('/api/articles/paginationnext').get(articleCtrl.getListFromDateAndStatus);
  // app.route('/api/users').put(users.update);
  // app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  // app.route('/api/users/password').post(users.changePassword);
  // app.route('/api/users/picture').post(users.changeProfilePicture);

  // Finish by binding the user middleware
  //app.param('userId', users.userByID);
};
