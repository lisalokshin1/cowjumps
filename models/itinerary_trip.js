var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// validation function

var itinerary_trip_nameValidation = function(val) {
	console.log("inside name validation");
	console.log(val);
	if (val.length >= 3) {
		return true;
	} else {
		return false;
	}
};

// define destination point within a route schema
var dpSchema = new Schema({
	city_name : String,
	//	days_stayed : String,
	//	transport : String,
	//	rating : Number,
	geo_coordinates : {
		longitude : Number,
		latitude : Number}
});


// define Route Overview schema
var itinerarySchema = new Schema({
  slug : { type: String, lowercase: true, required: true, unique: true },
	route_name : { type: String, required: false},
	id : Number,
	region : String,
	duration : String,
	budget : Number,
	destination_points : [dpSchema]
});

module.exports = mongoose.model('itinerary_trip_new',itinerarySchema);