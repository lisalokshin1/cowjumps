var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define place schema
var mapDataSchema = new Schema({
	name : { type: String, required: true},
	geo : { type: [Number], index: { type: '2dsphere', sparse: true } },
	geo_name : String,
    lastupdated : { type: Date, default: Date.now }
})

// export model
module.exports = mongoose.model('mapData',mapDataSchema);