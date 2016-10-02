(function() {
	"use strict";
	function NearbyResponseParser(top_n) {
		this.top_n = top_n;

		this.parse = function(raw_res_str) {
			var simplified_res = {};
			
			var raw_res_obj = JSON.parse(raw_res_str);
			var results = raw_res_obj["results"];
			if (results.length > 0) {
				simplified_res["icon"] = results[0].icon;
				simplified_res["location"] = [];
			}

			var n = Math.min(this.top_n, results.length);
			for (let i = 0; i < n; i++) {
				simplified_res["location"].push(results[i]['geometry']['location']);
			}

			return simplified_res;
		}
	}

	module.exports = NearbyResponseParser;
}());