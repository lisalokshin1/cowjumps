module.exports = function map (app) {
	var request = require('request'); // library to make requests to remote urls
	var mapData = require("../models/mapData.js"); //db model
	
	// UPDATE WITH YOUR GOOGLE MAPS API KEY
	var google_maps_key = "AIzaSyBcwy-Vt6p6Kl8ubXOkGixnyLj2jYaIvWA";

	app.get('/map', function(req, res) {
        var templateData = {
			pageTitle       : 'All Places',
			google_maps_key : google_maps_key
		};
		res.render('map.html', templateData);
    });

	app.post('/add_place', function(req, res) {
		// var name = req.body.place_name;
		var latlng_str   = req.body.latlng; // just a string
		var latlng_array = latlng_str.split(","); // split string into array

		var new_place = mapData({
			name     : req.body.name,
			geo      : latlng_array,
			geo_name : req.body.geo_name
		});

		// save to mongodb
		new_place.save(function(err){
			if (err) {
				console.log("there was an error saving");
				console.log(err);
			} else {
				console.log("New Place saved");
				console.log(new_place);
			}
		});

		// RESPONSE
		// if req is XMLHTTPRequest (AJAX) then respond with JSON
		if (req.xhr) {
			var replyData = {
				status : 'OK',
				msg : 'Place added successfully.'
			};
			res.json(replyData);
		} else {
			res.redirect('/');
		}
	});

	app.get('/data/places', function(req, res) {
		// query for all places
		var query = mapData.find({});
		query.select('name geo_name geo');
		query.exec(function(err, allPlaces){
			if (err) {
				res.send("Unable to query database for places").status(500);
			}

			console.log("retrieved " + allPlaces.length + " places from database");

			//build and render template
			var data = {
				status : 'OK',
				places : allPlaces
			};

			// was JSONP requested does querystring have callback
			// allow remote domains to request places json
			if (req.query.callback !== undefined) {
				res.jsonp(data);
			} else {
				res.json(data);
			}
		});
  });
};