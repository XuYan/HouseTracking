var mongoose = require('mongoose');

// Create the schema for documents in "house_tracking" database
var house_schema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sqf: {
  	type: Number,
  	required: true
  },
  bed_bath: {
  	type: String,
  	required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  distance_to_MS: {
  	type: Number,
  	required: false
  },
  distance_to_G: {
  	type: Number,
  	required: false
  }
});

// Export house model
module.exports = mongoose.model('house'/*collection: 'houses'*/, house_schema);