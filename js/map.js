var map;
var map2;
var markers = [];
var locationIcon = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-128.png';
var infowindow;
var adress;
var name;

function initMap() {
    var myOptions = {
        zoom: 13,
        center: {
            lat: 43.5081,
            lng: 16.4402
        },
        componentRestrictions: { country: "hr" }
    };

    map = new google.maps.Map(document.getElementById('map'), myOptions);

    $(document).on('click', '.locationCarouselItem', function () {
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);

    });
    $('.modalMore').on('click', function () {
        $('#myModalEvent').modal('toggle');
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);

    });
    $(document).on('click', '.modalMore', function () {
        $('#myModalEvent').modal('toggle');
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);

    });
    $('.moreRecc').on('click', function () {
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);

    });

    $(document).on('click', '.moreRecc', function () {
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);

    });
    $(document).on('click', '.moreReccMob', function () {
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);

    });
    $('.locationLink').on('click', function () {
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        $('#searchbar').removeAttr('value');
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);
    });
    $(document).on('click', '.locationLink', function () {
        if ($('#locationInfoSection').hasClass('locationInfoSectionHidden')) {
            $('#locationInfoSection').toggleClass('locationInfoSectionHidden');
        }
        $('#searchbar').removeAttr('value');
        var currentCenter = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(currentCenter);
        setMapOnAll(null);

    });
    $(document).on('click', 'a[href*=\\#]:not([href=\\#])', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top) - 55
                }, 1000);
                return false;
            }
        }

    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('showOnMap').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });




    map2 = new google.maps.Map(document.getElementById("customEventMap"), myOptions);




    var input = (document.getElementById('customEventLocation'));

    // var types = document.getElementById('type-selector');
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input, myOptions);
    autocomplete.bindTo('bounds', map2);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map2,
        anchorPoint: new google.maps.Point(0, -29)
    });
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map2, marker);
    });
}

// function geocodeAddress(geocoder, resultsMap) {
//     address = $('#address').text();
//     name = $('#locationName').text();
//     setMapOnAll(null);
//     geocoder.geocode({
//         'address': address
//     }, function (results, status) {
//         if (status === 'OK') {
//             resultsMap.setCenter(results[0].geometry.location);
//             infowindow = new google.maps.InfoWindow();
//             var service = new google.maps.places.PlacesService(map);
//             service.nearbySearch({
//                 location: results[0].geometry.location,
//                 radius: 100,
//                 keyword: name,
//             }, callback);
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }
// function callback(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//         createMarker(results[0]);
//     }
// }

// function createMarker(place) {
//     var placeLoc = place.geometry.location;
//     var image = new google.maps.MarkerImage(
//         place.icon,
//         new google.maps.Size(71, 71),
//         new google.maps.Point(0, 0),
//         new google.maps.Point(17, 34),
//         new google.maps.Size(25, 25));
//     markers.push(new google.maps.Marker({
//         map: map,
//         position: place.geometry.location,
//         icon: image
//     }));
//     google.maps.event.addListener(markers[0], 'click', function () {
//         infowindow.setContent('<div style="color:black"><strong>' + place.name + '</strong><br>' + '<br>' +
//             place.vicinity + '<br>' + '</div>');
//         infowindow.open(map, this);
//     });
// }
// function setMapOnAll(map) {
//     for (var i = 0; i < markers.length; i++) {
//         google.maps.event.clearListeners(markers[i], 'click');
//         markers[i].setMap(map);
//     }
//     markers = [];
// }
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        google.maps.event.clearListeners(markers[i], 'click');
        markers[i].setMap(map);
    }
    markers = [];
}

function geocodeAddress(geocoder, resultsMap) {
    var address = $('#address').text();
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            markers.push(new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            }));
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });


}
