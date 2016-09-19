module.exports = function(app, route) {
  
  app.get(route/* /getPropertyDetail */, function(request, response) {
    function onDetailObtained(detail) {
      console.log(detail);
      response.send(detail);
    }

    var api_provider = require('./utils/zillow');
    
    api_provider.send(request, onDetailObtained);
  });

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};