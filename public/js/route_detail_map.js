// google.maps.event.addDomListener(window, 'load', initialize);

// var poly;
// var map;

// function initialize() {
//   var chicago = new google.maps.LatLng(41.879535, -87.624333);
//   var mapOptions = {
//     zoom: 7,
//     center: chicago,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//   var polyOptions = {
//     strokeColor: '#000000',
//     strokeOpacity: 1.0,
//     strokeWeight: 3
//   }
//   poly = new google.maps.Polyline(polyOptions);
//   poly.setMap(map);

//   // Add a listener for the click event
//   google.maps.event.addListener(map, 'click', addLatLng);
// }


// function addLatLng(event) {

//   var path = poly.getPath();

//   // Because path is an MVCArray, we can simply append a new coordinate
//   // and it will automatically appear
//   path.push(event.latLng);

//   // Add a new marker at the new plotted point on the polyline.
//   var marker = new google.maps.Marker({
//     position: event.latLng,
//     title: '#' + path.getLength(),
//     map: map
//   });
// }





// function initialize() {
//   var myLatLng = new google.maps.LatLng(0, -180);
//   var mapOptions = {
//     zoom: 2,
//     center: myLatLng,
//     mapTypeId: google.maps.MapTypeId.TERRAIN
//   };

//   var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//   var tripRoute = new google.maps.Polyline({
//     path: tripCoordinates,
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 2
//   });

//   // var longitude = jQuery("#long").text(); // setting loc to the value of the added logatitude
//   // var latitude = jQuery("#lat").text(); // setting loc to the value of the added logatitude
//   //   console.log("This is the logatitude = " + longitude);
//   //   console.log("This is the latitude = " + latitude);

    
//   var tripCoordinates = [
      
//       new google.maps.LatLng(42.3178198, -71.1626756 ),
//       new google.maps.LatLng(-18.142599, 178.431),
//       new google.maps.LatLng(-27.46758, 153.027892)
//   ];

//   tripRoute.setMap(map);
// }

// google.maps.event.addDomListener(window, 'load', initialize);


function initialize() {
  var myLatLng = new google.maps.LatLng(40.7143528, -74.0059731);
  var mapOptions = {
    zoom: 8,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // var destinationsCoordinates = [];

  var destinationsCoordinates = [
      
    new google.maps.LatLng(41.32613569999999, -72.9591269 ),
    new google.maps.LatLng(41.0534302, -73.5387341 ),
    new google.maps.LatLng(40.65, -73.94999999999999)
  ];

  // for (var i = 0; i < {{#itinerary_trip.destination_points}}.length; i++) {

  // }

  var tripRoute = new google.maps.Polyline({
    path: destinationsCoordinates,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  tripRoute.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);