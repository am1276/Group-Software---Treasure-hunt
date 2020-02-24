var icons =  'http://maps.google.com/mapfiles/kml/shapes/';
var map;
var mainObjectives = {};
var secondaryObjectives = {};
var gamekeeperMapConfig = {
    center: {lat: 50.735918, lng: -3.533217},
    zoom: 17,
    minZoom: 17,
    maxZoom: 20,
    mapTypeId: 'satellite',
    disableDefaultUI: true
}

function initialiseGamekeeperMap() {
    map = new google.maps.Map(document.getElementById('map'), gamekeeperMapConfig);
    map.setTilt(0);
    map.addListener('click', function(click) {
        placeMainMarker(click.latLng, map);
    });
    map.addListener('rightclick', function(rightclick) {
        placeClueMarker(rightclick.latLng, map);
    });

}

function placeMainMarker(latLng, map) {
  var title = prompt('Name your primary objective:', '');
  if (title == '' || title == null) {
      return;
  } else if (title in mainObjectives) {
      alert("Main objective already exists!");
      return;
  }
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: icons + 'target.png',
    animation: google.maps.Animation.DROP
  });
  mainObjectives[title] = [latLng.lat(), latLng.lng()];
  console.log(mainObjectives);
  document.getElementById("mobjctvlist").innerHTML += "Main " + title + "\n" + mainObjectives[title] + "\n";
}

function placeClueMarker(latLng, map) {
    var title = prompt('Name your clue:', '');
    if (title == '' || title == null) {
        return;
    } else if (title in secondaryObjectives) {
        alert("Clue already exists!");
        return;
    }
    var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: icons + 'info_circle.png',
    animation: google.maps.Animation.DROP
  });
  secondaryObjectives[title] = [latLng.lat(), latLng.lng()];
  console.log(secondaryObjectives);
  document.getElementById("mobjctvlist").innerHTML += "Clue " + title + "\n" + secondaryObjectives[title] + "\n";
}
