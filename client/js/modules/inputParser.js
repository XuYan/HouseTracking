angular.module("inputParser", [])
.factory('parser_factory', function() {
	var input_object = (function() {
		var input_string = "";

		return {
			init: function(input) {
				this.input_string = input;
				return this;
			},
			trim: function() {
				this.input_string = this.input_string.trim();
				return this;
			},
			lower: function() {
				this.input_string = this.input_string.toLowerCase();
				return this;
			},
			value: function() {
				return this.input_string;
			}
		};
	}());

	return input_object;
});
