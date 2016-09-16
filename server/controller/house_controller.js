var Resource = require('resourcejs');
module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.house).rest();
  Resource(app, '', route, app.models.workplace).rest();

  // Get Area, combine filter, send request and parse response
  

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};