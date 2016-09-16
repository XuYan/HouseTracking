var express = require('express');
var _ = require('lodash');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Load the models.
app.models = require('./model/model_index');

// Load the routes.
var routes = require('./routes');
_.each(routes, function(controller, route) {
	app.use(route, controller(app, route));
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});