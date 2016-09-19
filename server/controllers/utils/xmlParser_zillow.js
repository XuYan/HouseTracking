(function() {
	"use strict";
	module.exports = {
		parse: function(xml_doc, onParseCompleted) {
			var xml2js = require('xml2js');
			var parser = new xml2js.Parser();
			var property_detail = {};

			parser.parseString(xml_doc, function(error, doc_obj) {
				var result = doc_obj['SearchResults:searchresults'].response[0].results[0].result[0];
				onParseCompleted({
					"year": result.yearBuilt[0],
  					"bed_bath": result.bedrooms[0] + " bedrooms, " + result.bathrooms[0] + " bathrooms",
  					"sqf": result.finishedSqFt[0],
  					"link": result.links[0].homedetails[0],
  					"longitude": result.address[0].longitude[0],
  					"latitude": result.address[0].latitude[0]
				});
			});
		}
	};
}());