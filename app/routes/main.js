'use strict';

/**
 * Module dependencies
 */

module.exports = function (app) {
  // Response with public/web/admin/index.html
  app.route('/admin').get(function(req, res, next) {
    res.sendFile('index.html', { root: global.__base + '/public/web/admin/' });
  });

  // Response with public/web/blog/index.html
  app.route('/blog').get(function(req, res, next) {
    res.sendFile('index.html', { root: global.__base + '/public/web/blog/' });
  });

  // Response with public/web/chat/index.html
  app.route('/chat').get(function(req, res, next) {
    res.sendFile('index.html', { root: global.__base + '/public/web/chat/' });
  });
};
