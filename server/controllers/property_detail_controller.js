module.exports = function(app, route) {
  
  app.get(route/* /getPropertyDetail */, function(request, response) {
    var api_provider = require('./utils/zillow');
    // var decoded_request = decodeURI(request);
    api_provider.send(request);
  });

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};