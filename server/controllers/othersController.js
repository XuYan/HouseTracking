var express = require('express');
var parser = require('./utils/jsonParser_googleNearby');

// TODO: All these should be configurable in app setting page
var top_n = 1; // Indicate the number of places to show at most for a specified place type
var other_place_config = {
	"grocery_or_supermarket": 8000, /* radius = 8km */
	"movie_theater": 8000
};

// Create location string for Google nearby search service
function createLocationParam(req) {
	var latitude = req.query.latitude;
	var longitude = req.query.longitude;
	if (!latitude || !longitude) {
		return undefined;
	}

	return latitude + ", " + longitude;
}

// Create Google nearby search request urls
function createRequestUrls(location) {
	var request_urls = {};
	var request_creator = require('./utils/requestCreator.js');
	var base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
	for (var place_type in other_place_config) {
		if (other_place_config.hasOwnProperty(place_type)) {
			var url_params = {
				"location": location,
				"radius": other_place_config[place_type],
				"type": place_type,
				"key": "AIzaSyCOplY8KvzVh5BMcYRosmuSsbKoi3olP0k"
			};
			request_urls[place_type] = request_creator.create(base_url, url_params);
			console.log(request_urls[place_type]);
		}
	}

	return request_urls;
}

function sendRequest(url, place_type, nearbySearchCallback) {
	var https = require('https');
	https.get(url, res => {
		var body = '';
		res.on('data', function(chunk) {
			body += chunk;
		});
		res.on('end', () => {
			nearbySearchCallback(place_type, new parser(top_n).parse(body));
		});
	}).on('error', (err) => {
		console.log(`Got error: ${err.message}`);
	});
}

module.exports = function(app, route) {
	var router = express.Router();
	var other_places = {};

	router.get('/', function(req, res, next) {
		other_places = {};
		var location = createLocationParam(req);
		if (!location) {
			res.status(400).send({
				message: "Invalid latitude and longitude for search center"
			});
		}

		var nearbySearchRequests = createRequestUrls(location);
		for (var place_type in nearbySearchRequests) {
			if (nearbySearchRequests.hasOwnProperty(place_type)) {
				sendRequest(nearbySearchRequests[place_type], place_type, function onNearbySearchRespond(place_type, adjusted_data) {
					other_places[place_type] = adjusted_data;
					if (isAllResponsesObtained()) {
						res.status(200).send(other_places);
					}
				})
			}
		}
	});

	function isAllResponsesObtained() {
		return Object.keys(other_places).length === Object.keys(other_place_config).length;
	}

	return router;
};