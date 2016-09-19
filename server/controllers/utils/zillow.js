module.exports = {
	// callback is invoked when property detail is available
	send: function(request, onDetailObtained) {
		var request_creator = require('./requestCreator');
		var xml_parser = require('./xmlParser_zillow');
		var http = require('http');

		// TODO: Field shouldn't be hardcoded
		var param_obj = {
			"zws-id": "YOUR_ID",
			"address": request.query['address'],
			"citystatezip": request.query['city'] + " " + request.query['state']
		}
		var base_url = "http://www.zillow.com/webservice/GetDeepSearchResults.htm";
		
		var api_request_url = request_creator.create(base_url, param_obj);

		console.log("request URL: " + api_request_url);
		http.get(api_request_url, (response) => {
			var completeResponse = '';
        	response.on('data', function (chunk) {
           		completeResponse += chunk;
        	});
        	response.on('end', function() {
        		xml_parser.parse(completeResponse, onDetailObtained);
        	});
		}).on('error', (e) => {
  			console.log(`Got error: ${e.message}`);
		});	
	}
};