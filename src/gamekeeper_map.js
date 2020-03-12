var map;
var mainObjectives = {};
var secondaryObjectives = {};
var markerReferences = [];
var gamekeeperMapConfig = {
    center: {lat: 50.735918, lng: -3.533217},
    zoom: 17,
    minZoom: 17,
    maxZoom: 20,
    mapTypeId: 'satellite',
    disableDefaultUI: true
};

// load the map on the gamekeeper UI
function initialiseGamekeeperMap() {
    map = new google.maps.Map(document.getElementById('map'), gamekeeperMapConfig);
    map.setTilt(0);

    // listener to place main objective markers
    map.addListener('click', function(click) {
        placeMainMarker(click.latLng, map);
    });

    // listener to place clue markers
    map.addListener('rightclick', function(rightclick) {
        placeClueMarker(rightclick.latLng, map);
    });

}

// ask for the name of the game when saving markers to store the markers under
function gameNamePrompt() {
    var gameName = prompt("Name your game:", "");
    if (gameName == "") {
        alert("Please enter a valid name.");
        gameNamePrompt();
    }
    return gameName;
}

// ask for the number of teams to create sufficient amount of passwords
function noTeamsPrompt() {
    var noTeamsQuery = prompt("Number of teams:", "");
    var noTeams = parseInt(noTeamsQuery);
    if (noTeams > 0) {
        return noTeams;
    }
    alert("Please enter a valid number.");
    noTeamsPrompt();
}

// event handler for left clicks, places main markers on map and asks to name the marker
function placeMainMarker(latLng, map) {
    var title = prompt('Name your primary objective:', '');
    if (title == '' || title == null) {
        return;
    } else if (title in mainObjectives) {
        alert("Main objective already exists!");
        return;
    }

// generate a marker on the map with the following config
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png',
        label: {text: title, color: "white", fontSize: "30px", fontWeight: "bold"},
        animation: google.maps.Animation.DROP
    });
    markerReferences.push(marker);

    // store marker data in designated object
    mainObjectives[title] = [latLng.lat(), latLng.lng()];
    document.getElementById("mobjctvlist").innerHTML += "Added main marker " + title + ".</br>";
}

// event handler for right clicks, places clue markers on maps and asks to name the marker
function placeClueMarker(latLng, map) {
    var title = prompt('Name your clue:', '');
    if (title == '' || title == null) {
        return;
    } else if (title in secondaryObjectives) {
        alert("Clue already exists!");
        return;
    }

    // generate a marker on the map with the following config
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: 'http://maps.google.com/mapfiles/kml/shapes/info_circle.png',
        label: {text: title, color: "white", fontSize: "30px", fontWeight: "bold"},
        animation: google.maps.Animation.DROP
    });
    markerReferences.push(marker);

    // store marker data in designated object
    secondaryObjectives[title] = [latLng.lat(), latLng.lng()];
    document.getElementById("mobjctvlist").innerHTML += "Added clue marker " + title + ".</br>";
}

// sends all marker data to database
function submitMarkers() {
    // ask the gamekeeper for a name of their game
    var gameName = gameNamePrompt();
    if (gameName === null) {
        return;
    }

    // ask the gamekeeper for the number of teams for their game
    var noTeams = noTeamsPrompt();
    if (noTeams === null) {
        return;
    }
    // generate sufficient passwords and insert to database
    var passwords = generateOTPs(noTeams);
    for (var i = 0; i < noTeams; i++) {
        $.ajax({
            url:'insert_OTPs.php',
            method:'POST',
            data:{oneTimePassword:passwords[i],gameName:gameName},
            success:function(data) { document.getElementById("mobjctvlist").innerHTML += "pw: " + data + "</br>"; }
        });
    }
    document.getElementById("mobjctvlist").innerHTML += "<h1>PLEASE MAKE NOTE OF THESE PASSWORDS FOR DISTRIBUTION!</h1></br>";

    // insert all main objective markers to database
    for (var marker in mainObjectives) {
        var title = marker;
        var latitude = mainObjectives[marker][0];
        var longitude = mainObjectives[marker][1];
        var type = "Main";
        $.ajax({
            url:'insert_markers.php',
            method:'POST',
            data:{title:title,latitude:latitude,longitude:longitude,type:type,gameName:gameName},
            success:function(data) { document.getElementById("mobjctvlist").innerHTML += data + ": Main markers.</br>"; }
        });
    }
    // insert all clue markers to database
    for (var marker in secondaryObjectives) {
        var title = marker;
        var latitude = secondaryObjectives[marker][0];
        var longitude = secondaryObjectives[marker][1];
        var type = "Clue";
        $.ajax({
            url:'insert_markers.php',
            method:'POST',
            data:{title:title,latitude:latitude,longitude:longitude,type:type,gameName:gameName},
            success:function(data) { document.getElementById("mobjctvlist").innerHTML += data + ": Clue markers.</br>"; }
        });
    }
    clearMarkers();
}

// ask gamekeeper if they want to delete all markers
function clearMarkers() {
    if (confirm("Delete markers?") == true) {
        markerReferences.forEach(function(i) {
            i.setMap(null);
        });
        mainObjectives = {};
        secondaryObjectives = {};
        document.getElementById("mobjctvlist").innerHTML += "Cleared markers.</br>";
    }
}

// generates array of passwords based off of numeral
function generateOTPs(noTeams) {
    var oneTimePasswords = [];

    for (var i = 0; i < noTeams; i++) {
        oneTimePasswords.push(Math.round(Math.random() * 5000000));
    }

    return oneTimePasswords;
}
