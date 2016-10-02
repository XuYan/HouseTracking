var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// mongoose's default promise library (mpromise) is deprecated. Here I use native ES6 promises instead
mongoose.Promise = global.Promise;
// Connect to MongoDB: database: 'house_tracking'
mongoose.connect('mongodb://localhost/house_tracking');
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Mongodb connection error:'));
connection.once('open'/*connection established*/, function() {
	// Load the models
	app.models = require('./model/model_index');

	// Load the routes
	var routes = require('./routes');
	_.each(routes, function(controller/*value*/, route/*key*/) {
		app.use(route, controller(app, route));
	});

	console.log('Server Listening on port 3000...');
	app.listen(3000);
});