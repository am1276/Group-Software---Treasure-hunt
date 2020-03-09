var icons = 'http://maps.google.com/mapfiles/kml/shapes/';
var map;
var hamburgerState = 0;
var userMapConfig = {
    center: {lat: 50.736038, lng: -3.535816},
    gestureHandling: 'none',
    zoom: 19,
    minZoom: 19,
    maxZoom: 19,
    mapTypeId: 'satellite',
    disableDefaultUI: true
};

// load the map on the player UI
function initialiseUserMap() {
    map = new google.maps.Map(document.getElementById('map'), userMapConfig);
    map.setTilt(45);

    var gameToLoad = gameToLoadPrompt();
    retreiveMarkers(gameToLoad);

    // repeatedly obtain user's position using GPS
    updateUserPosition();
}

// obtain user's position and center the map to it
function getUserPosition(position) {
    var userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
    };
    map.setCenter(userPosition);
}

// repeatedly watches for changes in user position then update map
function updateUserPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(getUserPosition);
    } else {
        alert("Could not update location.");
    }
}

// expands and closes sidebar hamburger div
function expandCloseMenu() {
    // 0 means menu is closed, so expand it
    if (hamburgerState == 0) {
        document.getElementById("hamburgermenu").style.width = "250px";
        document.getElementById("hamburger").style.right = "250px";
        document.getElementById("hamburger").style.filter = "brightness(50%)";
        document.getElementById("score").style.width = "0px";
        document.getElementById("score").style.fontSize = "0px";
        document.getElementById("clue").style.width = "0px";
        document.getElementById("clue").style.fontSize = "0px";
        hamburgerState = 1;
    } else {
        // if state isn't 0 close it
        document.getElementById("hamburgermenu").style.width = "0px";
        document.getElementById("hamburger").style.right = "0px";
        document.getElementById("hamburger").style.filter = "brightness(100%)";
        document.getElementById("score").style.width = "45%";
        document.getElementById("score").style.fontSize = "125%";
        document.getElementById("clue").style.width = "45%";
        document.getElementById("clue").style.fontSize = "125%";
        hamburgerState = 0;
    }
}

// obtain markers from the database and initialise a game with them
function retreiveMarkers(gameToLoad) {
    var main = {};
    var clue = {};
    $.ajax({
        url:'read_markers.php',
        data:{"gameName" : gameToLoad},
        dataType:'json',
        method:'POST',
        success:function(data) {
            data.forEach(function(marker) {
                if (marker["type"] == "Main") {
                    main[marker["title"]] = [marker["latitude"], marker["longitude"]];
                } else if (marker["type"] == "Clue") {
                    clue[marker["title"]] = [marker["latitude"], marker["longitude"]];
                } else {
                    alert("Failed to read marker data.");
                }
            });
            initialiseMainMarkers(main, clue, 0);
        }
    });
}

// query the player on which game save they would like to play
function gameToLoadPrompt() {
    var gameToLoad = prompt("Enter the name of game:", "");
    if (gameToLoad == "" || gameToLoad == null) {
        alert("Please enter a valid name.");
        gameToLoadPrompt();
    }
    return gameToLoad;
}

// launch the game. As of now for the MVP, only main objective markers are used.
function initialiseMainMarkers(markers, clues, score) {
    document.getElementById("score").innerHTML = "Score: " + score;
    // check if the player has depleted all main objectives
    if (Object.keys(markers).length == 0) {
        document.getElementById("objective").innerHTML = "You've gone through all markers.";
        return;
    }
    // obtain first objective location in the database
    var location = Object.keys(markers)[0];
    document.getElementById("objective").innerHTML = "Find location: " + location;
    // track clicks on the player UI button
    $("#objective").unbind().click(function() {
        location = Object.keys(markers)[0];
        // calculate the distance between player and the current objective marker
        var playerPos = map.getCenter();
        var markerPos = new google.maps.LatLng({lat: parseFloat(markers[location][0]), lng: parseFloat(markers[location][1])});
        var distance = google.maps.geometry.spherical.computeDistanceBetween(playerPos, markerPos);
        // score player off of calculated distance
        if (distance < 25) {
            alert("You've found " + location + " at " + distance + " away!");
            score += 100;
        } else if (distance < 50) {
            alert("Better luck next time, you were " + distance + " metres away!");
            score += 50;
        } else {
            alert("Better luck next time, you were " + distance + " metres away!");
            score += 10;
        }

        clearInterval(interval);

        // remove the current objective marker once accomplished to move onto the next
        delete markers[location];
        initialiseMainMarkers(markers, clues, score);
    });
    var interval = setInterval(function() {
        if (Object.keys(clues).length == 0) {
            document.getElementById("clue").innerHTML = "All clues found!";
            return;
        }
        var playerPosC = map.getCenter();
        var shortestDist = null;
        for (var i in clues) {
            var markerPosC = new google.maps.LatLng({lat: parseFloat(clues[i][0]), lng: parseFloat(clues[i][1])});
            var distanceC = google.maps.geometry.spherical.computeDistanceBetween(playerPosC, markerPosC);
            if (distanceC < 25) {
                alert("You found a clue!");
                document.getElementById("clue").innerHTML = "You found a clue!";
                var marker = new google.maps.Marker({
                    position: markerPosC,
                    map: map,
                    icon: icons + 'info_circle.png',
                    label: {text: i, color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"},
                    animation: google.maps.Animation.DROP
                });
                delete clues[i];
                return;
            } else if (distanceC < shortestDist || shortestDist == null) {
                shortestDist = distanceC;
            }
        }
        document.getElementById("clue").innerHTML = "Nearest clue: " + Math.round(shortestDist) + "m";
    }, 3000);
}
