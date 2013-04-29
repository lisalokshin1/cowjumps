var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// validation function
var travel_nameValidation = function(val) {
	console.log("inside name validation");
	console.log(val);
	
	if (val.length >= 3) {
		return true;
	} else {
		return false;
	}
}

// validation function
var city_nameValidation = function(val) {
	console.log("inside name validation");
	console.log(val);
	
	if (val.length >= 3) {
		return true;
	} else {
		return false;
	}
}

// define destination point within a route schema
var dpSchema = new Schema({
	 city_name : { type: String, required: true, validate: [city_nameValidation, 'City Name must be at least 3 characters.']},
	days_stayed : Number,
	transport : String,
	rating : Number,
	geo_coordinates : {
				longitude : Number,
				latitude : Number},
    
});


// define Route Overview schema
var travelSchema = new Schema({
    slug : { type: String, lowercase: true, required: true, unique: true },
	route_name : { type: String, required: true},
	//region : String,
    duration : String,
	budget : String, 
	destination_points : [dpSchema],

   
});


module.exports = mongoose.model('travel',travelSchema);





