module.exports = {
	send: function(request) {
		// TODO: Field shouldn't be hardcoded
		var param_obj = {
			"zws-id": "xxxx",
			"address": request.query['address'],
			"citystatezip": request.query['city'] + " " + request.query['state']
		}
		var base_url = "http://www.zillow.com/webservice/GetDeepSearchResults.htm";
		var request_creator = require('./requestCreator');
		var api_request = request_creator.create(base_url, param_obj);

    	console.log("request URL: " + api_request); 
	}
};