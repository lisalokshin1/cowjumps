// when page is ready, initialize the map!
google.maps.event.addDomListener(window, 'load', initialize);

var geocoder;
var map;
var places;
var destinations = []; // will hold array of destination objects

function initialize() {
 
  // create the geocoder
  geocoder = new google.maps.Geocoder();
    
  // set map details
  var mapOptions = {
    center: new google.maps.LatLng(40.74649,-74.0094),
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
    
  // create the map and reference the div#map-canvas container
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
 
}
 
// When Next button is clicked
jQuery('#nextBtn').click(function(e){
    
  // set loc to the value of the added textbox, which is an input location  
  var loc = jQuery("input.destinationTextbox:last").val(); 
  console.log("user entered location = " + loc);
 
  geocoder.geocode( { 'address': loc }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
   
      // log out results from geocoding
      console.log("geocoding results");
      console.log(results);
          
      // reposition map to the first returned location
      map.setCenter(results[0].geometry.location);
          
      // put marker on map
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location
      });
          
      console.log(results[0].geometry.location);
          
      // preparing data for form posting
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      var loc_name = results[0].formatted_address;
      var duration = results[0].duration;
   
      var tmpDestination = {
        latitude : lat,
        longitude : lng,
        city_name : loc_name
      }
          
      destinations.push(tmpDestination);
      console.log("new destination added");
      
      jQuery("#finalDestinationData").val( JSON.stringify( destinations ));

      //increment counter
      counter = counter+1;
            
      var data = { counter : counter };
            
      // render template
      var output = form_template.render(data);
      jQuery("#addDest").append(output);
            
   
      } else {
          alert("Try again. Geocode was not successful for the following reason: " + status);
        }
    });
  
  e.preventDefault();
  return false;
 
}); 