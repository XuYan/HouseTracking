var express = require('express');

module.exports = function(app, route) {
	var house_model = app.models.house;

	var router = express.Router();
	router.get('/', function(req, res, next) {
		console.log("PATH: /");
		house_model.find(function(err, houses) {
			if (err) {
				console.log("Fail to get all house documents: " + err);
				res.send(err);
			}

			res.send(houses);
		});
	});

	// Request for property detail 
	router.use('/detail', function(req, res, next) {
		function onDetailObtained(house_detail) {
			var new_document = createDocument(house_detail);
			// save the newly created house document and check for errors
			new_document.save(function(err) {
				if (err) {
					console.log("Fail to save the new house document: " + err);
					res.send(err);
				}
				console.log("New document is created and saved");
				res.send(new_document);
			});
		}

		var api_provider = require('./utils/zillow');
		api_provider.send(req, onDetailObtained);
	});

	// Support CRUD operations
	router.get('/:region', function(req, res, next) {
		console.log("PATH: /" + req.params.region);
		var region = req.params.region;
		house_model.find({city: region}, function(err, houses) {
			if (err) {
				console.log("Fail to get documents for " + region + " : " + err);
				res.send(err);
			}

			res.send(houses);
		});
	});

	router.delete('/:region/:id', function(req, res, next) {
		var city = req.params.region;
		var house_id = req.params.id;
		console.log("Deleting from DB: " + city + "_" + house_id);

		// Find a matching document and remove it immediately
		house_model.findByIdAndRemove({_id: house_id}, function(err) {
			if (err) {
				res.status(400).send({message: house_id + " deletion fails"});
			}
			res.status(200).send({message: house_id + " is removed from DB successfully"});
		});
	});

	function createDocument(house_detail) {
		var strProcessor = require('./utils/stringProcessor');
		// create a new instance of the house model
		return new house_model({
			"street": house_detail["street"],
			"city": strProcessor.lowercase(house_detail["city"]),
			"year": parseInt(house_detail["year"]),
			"sqf": parseInt(house_detail["sqf"]),
			"price": parseFloat(house_detail["price"]),
			"bed_bath": house_detail["bed_bath"],
			"longitude": parseFloat(house_detail["longitude"]),
			"latitude": parseFloat(house_detail["latitude"])
		});
	}

	return router;
};