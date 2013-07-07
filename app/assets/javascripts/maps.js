

$(document).ready(function(){
  google.maps.visualRefresh = true;

  var hospitals = $("#hospitals").data("hospitals");

  // function initialize() {
  //   var mapOptions = {
  //     center: new google.maps.LatLng(41.8500, -87.8500),
  //     zoom: 11,
  //     mapTypeId: google.maps.MapTypeId.TERRAIN,
  //     panControl: false,
  //     zoomControl: true,
  //     zoomControlOptions: {
  //     style: google.maps.ZoomControlStyle.SMALL,
  //     position: google.maps.ControlPosition.BOTTOM_RIGHT
  //     },
  //     scaleControl: true,
  //     scaleControlOptions: {
  //     position: google.maps.ControlPosition.BOTTOM_RIGHT
  //     }
  //   };

  //   var map = new google.maps.Map(document.getElementById("map-canvas"),
  //       mapOptions);

  //   setMarkers(map, hospitals);


  //   };




    // function setMarkers(map, locations){
      
    //   var iconBase = 'https://googledrive.com/host/0B9bg70URlInBR00zUW9PYnBWLWM/';

    //   var shape = {
    //   coord: [1, 1, 1, 32, 32, 32, 32 , 1],
    //   type: 'poly'
    //   };

    //   for (var i = 0; i < locations.length; i++) {
    //     var hospital = locations[i];
    //     var myLatLng = new google.maps.LatLng(hospital["latitude"], hospital["longitude"]);
    //     var marker = new google.maps.Marker({
    //       position: myLatLng,
    //       map: map,
    //       icon: iconBase + 'h_sign_32x32.png',
    //       shape: shape,
    //       title: hospital["provider_name"],
    //       zIndex: i
    //     });
    //      marker.html = hospital["infobox_html"];

    //     var infowindow = new google.maps.InfoWindow({
    //       maxWidth: 400 
    //     });
   
    //     google.maps.event.addListener(marker, 'click', function() {
    //       infowindow.setContent(this.html);
    //       infowindow.open(map, this);
    //     });
    //   };
    // };

    function initialize() {
      // var map = new google.maps.Map(document.getElementById('map-canvas'), {
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // });

    var styles = [
        {
          stylers: [
            { hue: "#008C9A" },
            { saturation: -20 }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.neighborhood",
          elementType: "labels",
          stylers: [
            {visibility: "simplified"}
          ]
        },{
          featureType: "landscape",
          elementType: "all",
          stylers: [
            { visibility: "simplified" }
          ]
        },{
          featureType: "poi",
          elementType: "all",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "transit",
          elementType: "all",
          stylers: [
            { visibility: "simplified" }
          ]
        }
      ];

      var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

      var mapOptions = {
        center: new google.maps.LatLng(41.8500, -87.8500),
        zoom: 11,
        mapTypeIds: [google.maps.MapTypeId.TERRAIN, 'map_style'],
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.BOTTOM_RIGHT
        },
        scaleControl: true,
        scaleControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_RIGHT
        }
      };



      var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

      setMarkers(map, hospitals);

      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(41.7700, -87.9000),
          new google.maps.LatLng(41.9900, -87.5500));
      map.fitBounds(defaultBounds);

      var input = /** @type {HTMLInputElement} */(document.getElementById('target'));
      var searchBox = new google.maps.places.SearchBox(input);
      var markers = [];

      google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }

        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          markers.push(marker);

          bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
      });

      google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
    }

    function setMarkers(map, locations){
      
      var iconBase = 'https://googledrive.com/host/0B9bg70URlInBR00zUW9PYnBWLWM/';

      var shape = {
      coord: [1, 1, 1, 32, 32, 32, 32 , 1],
      type: 'poly'
      };

      for (var i = 0; i < locations.length; i++) {
        var hospital = locations[i];
        var myLatLng = new google.maps.LatLng(hospital["latitude"], hospital["longitude"]);
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: iconBase + 'h_sign_32x32.png',
          shape: shape,
          title: hospital["provider_name"],
          zIndex: i
        });
         marker.html = hospital["infobox_html"];

        var infowindow = new google.maps.InfoWindow({
          maxWidth: 400 
        });
    
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(this.html);
          infowindow.open(map, this);
        });
      };
    };

    google.maps.event.addDomListener(window, 'load', initialize);



});
