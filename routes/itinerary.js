module.exports = function initItinerary (app) {

  var itineraryModel = require('../models/itinerary_trip.js');

  app.get('/add_route', function(req, res) {
    var templateData = {
      page_title : 'Add a new travel route'
    };
    res.render('add_route_form.html', templateData);
  });

  app.post('/add_route', function(req, res){
    // accept form post data
    var newItinerary = new itineraryModel({
      route_name   : req.body.route_name,
      duration     : req.body.duration,
      budget       : req.body.budget,
      slug         : req.body.route_name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
    });

    // check that hidden input got passed along
    console.log(req.body.destinations_json);

    // get destination_json and convert to native javascript
    var destData = JSON.parse(req.body.destinations_json);

    for (var d in destData) {
      console.log(destData[d]);
      // create sub doc for itinerary

      // get the dest out of array
      var currentDest = destData[d];

      // create dest object 
      var destDoc = {
        city_name : currentDest.city_name,
        geo_coordinates : {
          latitude : currentDest.latitude,
          longitude : currentDest.longitude
        }
      };

      // push dest obj into newIt
      newItinerary.destination_points.push(destDoc);
    }

    // save the new itinerary to the database
    newItinerary.save(function(err){
      if (err) {
        console.error("Error on saving new itinerary");
        console.error(err); // log out to Terminal all errors

        var templateData = {
          page_title : 'Add a new travel route',
          errors : err.errors,
          itinerary : req.body
        };
        res.render('add_route_form.html', templateData);
      } else {
        console.log("Created new itinerary!");
        console.log(newItinerary);
        // redirect to the route page
        res.redirect('/itineraries/'+ newItinerary.slug);
      }
    });
  });


  app.get('/itineraries/:itinerary_id', function(req, res){
    console.log("detail page requested for " + req.params.itinerary_id);

    //get the requested itinerary by the param on the url :itinerary_id
    var itinerary_id = req.params.itinerary_id;

    // query the database for itinerary
    var itineraryQuery = itineraryModel.findOne({slug:itinerary_id});
      itineraryQuery.exec(function(err, currentItinerary){
      if (err) {
        return res.status(500).send("There was an error on the itinerary");
      }
      if (currentItinerary === null) {
        return res.status(404).render('404.html');
      }
      console.log("Found trip route");
      console.log(currentItinerary.route_name);
      //prepare template data for view
      var templateData = {
        itinerary_trip : currentItinerary,
        pageTitle : currentItinerary.name
      };
      // render and return the template
      res.render('route_detail.html', templateData);
    }); // end of .findOne query
  });

  app.get('/browse', function(req, res) {
    console.log("The BROWSE PAGE has been requested");
    itineraryModel.find({}, 'route_name slug source', function(err, itineraries){
      console.log("The search has begun");
      if (err) {
        res.send("Unable to query database for destination").status(500);
      }
      console.log("retrieved " + itineraries.length + " itineraries from database");
      var templateData = {
        itineraries : itineraries,
        pageTitle : "Routes (" + itineraries.length + ")"
      };
      res.render('browse_routes.html', templateData);
    });
  });
};


