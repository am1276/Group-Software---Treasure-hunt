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
        document.getElementById("container").style.right = "250px";
        hamburgerState = 1;
    } else {
        // if state isn't 0 close it
        document.getElementById("hamburgermenu").style.width = "0px";
        document.getElementById("hamburger").style.right = "0px";
        document.getElementById("container").style.right = "0px";
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
                    main[marker["title"]] = [marker["latitude"], marker["longitude"], marker["question"], marker["answer"]];
                } else if (marker["type"] == "Clue") {
                    clue[marker["title"]] = [marker["latitude"], marker["longitude"]];
                } else {
                    alert("Failed to read marker data.");
                }
            });
            initialiseMarkers(main, clue, 0);
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
function initialiseMarkers(markers, clues, score) {

    document.getElementById("score").innerHTML = "Score: " + score;

    // check if the player has depleted all main objectives
    if (Object.keys(markers).length == 0) {
        document.getElementById("objective").innerHTML = "You've gone through all markers.";
        return;
    }

    // obtain first objective location in the database
    var location = Object.keys(markers)[0];
    var currentObjectiveText = "Find location: " + location;
    document.getElementById("objective").innerHTML = currentObjectiveText;

    // track clicks on the player UI button
    $("#objective").unbind().click(function() {
        location = Object.keys(markers)[0];
        // calculate the distance between player and the current objective marker
        var playerPos = map.getCenter();
        var markerPos = new google.maps.LatLng({lat: parseFloat(markers[location][0]), lng: parseFloat(markers[location][1])});
        var distance = google.maps.geometry.spherical.computeDistanceBetween(playerPos, markerPos);
        
        var bonus;
        var answer = markers[location][3].toLowerCase();
        
        // score player off of calculated distance and if they can answer the question in three tries
        if (distance < 25) {
            document.getElementById("clue").innerHTML = "Spot on, you were " + Math.round(distance) + "m away!";
            score += 100;
            // give player bonus points if they answer a question correctly
            // they have three tries and the bonus gets smaller each time they get the answer wrong
            for(bonus = 100; bonus <= 40; bonus -= 30){
                var playerAnswer = prompt(markers[location][2]).toLowerCase()
                var n = playerAnswer.localeCompare(answer);
                if (n == 0){
                    score += bonus;
                    break;
                }
            }
        } else if (distance < 50) {
            document.getElementById("clue").innerHTML = "Close enough, you were " + Math.round(distance) + "m metres away!";
            score += 70;
            for(bonus = 100; bonus <= 40; bonus -= 30){
                var playerAnswer = prompt(markers[location][2]).toLowerCase()
                var n = playerAnswer.localeCompare(answer);
                if (n == 0){
                    score += bonus;
                    break;
                }
        } else {
            document.getElementById("objective").style.background = "red";
            document.getElementById("score").style.cssText = "background: red; border-color: darkred;";
            document.getElementById("objective").innerHTML = "Not quite there yet!";
            score -= 10;
            document.getElementById("score").innerHTML = "Score: " + score;
            setTimeout(function() {
                document.getElementById("objective").style.background = "linear-gradient(49deg, rgba(0,59,250,0.7959558823529411) 0%, rgba(2,139,255,1) 51%, rgba(68,201,255,0.7987570028011204) 100%)";
                document.getElementById("score").style.cssText = "background: rgb(0,59,250) linear-gradient(49deg, rgba(0,59,250,0.7959558823529411) 0%, rgba(2,139,255,1) 51%, rgba(68,201,255,0.7987570028011204) 100%); border-color: royalblue;";
                document.getElementById("objective").innerHTML = currentObjectiveText;
            }, 4000);
            return;
        }
        var marker = new google.maps.Marker({
            position: markerPos,
            map: map,
            icon: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png',
            label: {text: location, color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"},
            animation: google.maps.Animation.DROP
        });
        clearInterval(clueMarkerChecker);

        // remove the current objective marker once accomplished to move onto the next
        delete markers[location];

        initialiseMarkers(markers, clues, score);
    });

    var clueMarkerChecker = setInterval(function() {
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
                score += 50;
                document.getElementById("score").innerHTML = "Score: " + score;
                document.getElementById("clue").innerHTML = "Clue found!";
                document.getElementById("clue").style.transform = "scale(1.2)";
                var marker = new google.maps.Marker({
                    position: markerPosC,
                    map: map,
                    icon: icons + 'info_circle.png',
                    label: {text: i, color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"},
                    animation: google.maps.Animation.DROP
                });
                delete clues[i];
                setTimeout(function() {
                    document.getElementById("clue").style.transform = "scale(1)";
                }, 7000);
                return;
            } else if (distanceC < shortestDist || shortestDist == null) {
                shortestDist = distanceC;
            }
        }
        document.getElementById("clue").innerHTML = "Nearest clue: " + Math.round(shortestDist) + "m";
        document.getElementById("clue").style.transform = "scale(1.08)";
        setTimeout(function() {
            document.getElementById("clue").style.transform = "scale(1)";
        }, 480);
    }, 3000);
}
