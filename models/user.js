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

// define users schema
var userSchema = new Schema({
	  name : String,
	  Age : Number,
		Sex : String,
		Location : String,
		routes : [travelSchema],
    
});



module.exports = mongoose.model('user', userSchema);





