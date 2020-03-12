var icons = 'http://maps.google.com/mapfiles/kml/shapes/';
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

// ask the gamekeeper to provide a question when placing a main objective marker
function questionPrompt() {
    var question = prompt("Please enter a question", "");
    if (question == "") {
        alert("Please enter a valid question.");
        questionPrompt();
    }
    return question;
}

// ask the gamekeeper to provide the answer to the question when placing the main objective marker
function answerPrompt() {
    var answer = prompt("Please enter the answer", "");
    if (answer == "") {
        alert("Please enter a valid answer.");
        answerPrompt();
    }
    return answer;
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
    var question = questionPrompt();
    var answer = answerPrompt();
// generate a marker on the map with the following config
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: icons + 'target.png',
        animation: google.maps.Animation.DROP,
        question: question,
        answer: answer
    });
    markerReferences.push(marker);
    // store marker data in designated object
    mainObjectives[title] = [latLng.lat(), latLng.lng(), question, answer];
    console.log(mainObjectives);
    document.getElementById("mobjctvlist").innerHTML += "Main " + title + "\n" + mainObjectives[title] + "\n";
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
        icon: icons + 'info_circle.png',
        animation: google.maps.Animation.DROP
    });
    markerReferences.push(marker);
    // store marker data in designated object
    secondaryObjectives[title] = [latLng.lat(), latLng.lng()];
    console.log(secondaryObjectives);
    document.getElementById("mobjctvlist").innerHTML += "Clue " + title + "\n" + secondaryObjectives[title] + "\n";
}

// sends all marker data to database (php file)
function submitMarkers() {
    var gameName = gameNamePrompt();
    if (gameName == null)
        return;
    // insert all main objective markers
    for (var marker in mainObjectives) {
        var title = marker;
        var latitude = mainObjectives[marker][0];
        var longitude = mainObjectives[marker][1];
        var question = mainObjectives[marker][2];
        var answer = mainObjectives[marker][3];
        var type = "Main";
        $.ajax({
            url:'insert_markers.php',
            method:'POST',
            data:{title:title,latitude:latitude,longitude:longitude,question:question,answer:answer,type:type,gameName:gameName},
            success:function(data) { alert(data + ": Main objective markers.") } // BUG HERE
        });
    }
    // insert all clue markers
    for (var marker in secondaryObjectives) {
        var title = marker;
        var latitude = secondaryObjectives[marker][0];
        var longitude = secondaryObjectives[marker][1];
        var type = "Clue";
        $.ajax({
            url:'insert_markers.php',
            method:'POST',
            data:{title:title,latitude:latitude,longitude:longitude,type:type,gameName:gameName},
            success:function(data) { alert(data + ": Clue markers.") } // BUG HERE
        });
    }
    // clear the gamekeeper map of markers
    markerReferences.forEach(function(i) {
        i.setMap(null);
    });
    // remove all references to markers once they have been saved to the db
    mainObjectives = {};
    secondaryObjectives = {};
}
