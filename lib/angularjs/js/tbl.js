/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * javascript google map service locator functions
 *
 * @author Daniele Centamore <daniele.centamore@gmail.com>
 */

var map;
var service;
var infowindow;
var lat;
var lng;
var geocoder = new google.maps.Geocoder();
var radius;
var query;
var save_url;
var search_results;
var search_location;
var my_location;
var caching = false;
var cached_results;


function setRadius(r) {

    radius = r;
}

function getRadius() {

    return radius;
}


function setQuery(q) {

    query = q;
}

function getQuery() {

    return query;
}

function setMyLocation(myloc) {

    my_location = myloc;
}

function getMyLocation() {

    return my_location;
}

function setSaveUrl(url) {

    save_url = url;
}

function getSaveUrl() {

    return save_url;
}

function setLatitude(l) {

    lat = l;
}

function getLatitude() {

    return lat;
}

function setLongitude(l) {

    lng = l;
}

function getLongitude() {

    return lng;
}

function setLocation(loc) {
    search_location = loc;
}

function getLocation() {
    return search_location;
}



function setGeometryByLocation(search_location) {

    if ((search_location.length < 2) || (search_location == '')) {
        search_location = mylocation;
    }

    geocoder.geocode({"address": search_location}, function(results, status) {

        // If the Geocoding was successful
        if (status == google.maps.GeocoderStatus.OK) {

            // Create a Google Map at the latitude/longitude returned by the Geocoder.
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            

        }
    });

    setLocation(search_location);
}

function initialize() {

    

    /* Lat. and Lon. of the center of the map */
    var myCenter = new google.maps.LatLng(lat, lng);

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        zoom: 12, //zoom level
        center: myCenter, //center position
        scrollwheel: false, //zoom when scroll disable
        zoomControl: true, //show control zoom
        mapTypeId: google.maps.MapTypeId.HYBRID

    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var request = {
        location: myCenter,
        radius: radius,
        query: query
    };

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    if (caching) {
        service.textSearch(request, callback_caching);
    } else {
        service.textSearch(request, callback);
    }

}


function callback(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var search_results = encodeURIComponent(JSON.stringify(results));
        var search_location = getLocation();
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(place);
        }
        
    }

}

function callback_caching(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        results = JSON.parse(cached_results);
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(place);
        }

    }

}

function createMarker(place) {

    var contentString = '<div id="content" style="width:200px;height:150px;">' +
            '<h2 id="firstHeading" class="firstHeading">' + place.name + '</h2>' +
            '<p>' + place.formatted_address + '</p>' +
            '</div>';



    var myLatlng = new google.maps.LatLng(parseFloat(place.geometry.location.k), parseFloat(place.geometry.location.D));
    var marker = new google.maps.Marker({
        map: map,
        position: myLatlng
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
    });

}


function loadMap(location){
    
    setMyLocation(location);    
    setLocation(location);
    setQuery(['resort']);
    setRadius(5000);
    setGeometryByLocation(location);
    initialize();
    google.maps.event.addDomListener(window, 'resize', initialize);
    google.maps.event.addDomListener(window, 'load', initialize);
}


