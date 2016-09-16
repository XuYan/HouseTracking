var mongoose = require('mongoose');

// Create the schema of "house_tracking" database ("house" collection)
var house_schema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  price_per_sqf: {
  	type: Number,
  	required: true
  },
  sqf: {
  	type: Number,
  	required: true
  },
  BB: {
  	type: String,
  	required: true
  },
  distance_to_MS: {
  	type: Number,
  	required: true
  },
  distance_to_G: {
  	type: Number,
  	required: true
  }
});

// Export the model schema.
module.exports = house_schema;