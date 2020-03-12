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

    // obtain markers from database and setup game
    retreiveMarkers(gameName);

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
    if (hamburgerState == 0) { // 0 means menu is closed, so expand it
        // obtain top player scores
        $.ajax({
            url:'leaderboard.php',
            method:'POST',
            data:{},
            success:function(playerScores) {
                var playerScoresJSON = JSON.parse(playerScores);
                for (var i = 0; i < playerScoresJSON.length; i++) {
                    document.getElementById("leaderboard").innerHTML += (i + 1) + " | " + playerScoresJSON[i]["PlayerName"] + " | " + playerScoresJSON[i]["Score"] + "</br>";
                }
            }
        });
        document.getElementById("hamburgermenu").style.width = "250px";
        document.getElementById("hamburger").style.right = "250px";
        document.getElementById("container").style.right = "250px";
        document.getElementById("leaderboardheader").style.fontSize = "30px";
        document.getElementById("leaderboard").style.fontSize = "28px";
        hamburgerState = 1;
    } else { // if state isn't 0 close it
        document.getElementById("hamburgermenu").style.width = "0px";
        document.getElementById("hamburger").style.right = "0px";
        document.getElementById("container").style.right = "0px";
        document.getElementById("leaderboardheader").style.fontSize = "0px";
        document.getElementById("leaderboard").style.fontSize = "0px";
        // clear leaderboard after menu is not visible
        setTimeout(function() {
            document.getElementById("leaderboard").innerHTML = "";
        }, 500);
        hamburgerState = 0;
    }
}

// obtain markers from the database and initialise a game with them
function retreiveMarkers(gameToLoad) {
    var main = {};
    var clue = {};

    // read database and obtain main and clue markers
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

            // once all markers obtained, load the game up with them
            initialiseMarkers(main, clue, 0);
        }
    });
}

// launch the game on the player's UI
function initialiseMarkers(markers, clues, score) {

    // innteractively update player's score on UI
    document.getElementById("score").innerHTML = "Score: " + score;

    // check if the player has depleted all main objectives and end game
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

        // score player off of calculated distance
        if (distance <= 50) {
            score += 50 + (50 - Math.round(distance));
            if (distance <= 25) {
                document.getElementById("clue").innerHTML = "Spot on, you were " + Math.round(distance) + "m away!";
            } else {
                document.getElementById("clue").innerHTML = "Close enough, you were " + Math.round(distance) + "m away";
            }

            // upload score to database
            $.ajax({
                url:'update_player_score.php',
                method:'POST',
                data:{playerID:playerID,score:score},
                success:function(data) { console.log(data); }
            });
        } else { // deduct player score if they are not close enough to main objective
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

        // plot current main objective marker on UI when found
        var marker = new google.maps.Marker({
            position: markerPos,
            map: map,
            icon: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png',
            label: {text: location, color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"},
            animation: google.maps.Animation.DROP
        });
        // temporarily stop automatic clue marker checking
        clearInterval(clueMarkerChecker);

        // remove the current objective marker once accomplished to move onto the next
        delete markers[location];

        initialiseMarkers(markers, clues, score);
    });

    // checks clue markers near player every 3 seconds
    var clueMarkerChecker = setInterval(function() {
        if (Object.keys(clues).length == 0) {
            document.getElementById("clue").innerHTML = "All clues found!";
            return;
        }

        // calculate distance between each clue marker and player
        var playerPosC = map.getCenter();
        var shortestDist = null;
        for (var i in clues) {
            var markerPosC = new google.maps.LatLng({lat: parseFloat(clues[i][0]), lng: parseFloat(clues[i][1])});
            var distanceC = google.maps.geometry.spherical.computeDistanceBetween(playerPosC, markerPosC);

            // when clue marker is found to be near player
            if (distanceC < 25) {
                score += 50;
                document.getElementById("score").innerHTML = "Score: " + score;
                document.getElementById("clue").innerHTML = "Clue found!";
                document.getElementById("clue").style.transform = "scale(1.2)";

                // plot clue marker on UI and give a clue
                var marker = new google.maps.Marker({
                    position: markerPosC,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/kml/shapes/info_circle.png',
                    label: {text: i, color: "#FFFFFF", fontSize: "20px", fontWeight: "bold"},
                    animation: google.maps.Animation.DROP
                });

                // clue consists of compass direction and distance to their current main objective
                var markerPos = new google.maps.LatLng({lat: parseFloat(markers[location][0]), lng: parseFloat(markers[location][1])});
                var bearing = google.maps.geometry.spherical.computeHeading(markerPosC, markerPos);
                var distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(markerPosC, markerPos));
                var direction;

                // calculate the compass direction based off of 360 bearing
                if ((bearing > 330 && bearing <= 360) || (bearing >= 0 && bearing < 30)) {
                    direction = "north";
                } else if (bearing >= 30 && bearing < 60) {
                    direction = "north-east";
                } else if (bearing >= 60 && bearing < 120) {
                    direction = "east";
                } else if (bearing >= 120 && bearing < 150) {
                    direction = "south-east";
                } else if (bearing >= 150 && bearing < 210) {
                    direction = "south";
                } else if (bearing >= 210 && bearing < 240) {
                    direction = "south-west";
                } else if (bearing >= 240 && bearing < 300) {
                    direction = "west";
                } else {
                    direction = "north-west";
                }

                // display the clue above the found clue marker
                var clueInfo = new google.maps.InfoWindow({
                    content: location + " is " + distance + "m " + direction
                });
                clueInfo.open(map, marker);

                // clicking on clue marker reopens the clue
                marker.addListener('click', function() {
                  clueInfo.open(map, marker);
                });

                // remove the found clue marker
                delete clues[i];

                // update the player's score when they find clue
                $.ajax({
                    url:'update_player_score.php',
                    method:'POST',
                    data:{playerID:playerID,score:score},
                    success:function(data) { console.log(data); }
                });

                setTimeout(function() {
                    document.getElementById("clue").style.transform = "scale(1)";
                }, 7000);
                return;
            } else if (distanceC < shortestDist || shortestDist == null) { // find the closest clue to player
                shortestDist = distanceC;
            }
        }

        // display closest clue on UI
        document.getElementById("clue").innerHTML = "Nearest clue: " + Math.round(shortestDist) + "m";
        document.getElementById("clue").style.transform = "scale(1.08)";
        setTimeout(function() {
            document.getElementById("clue").style.transform = "scale(1)";
        }, 480);
    }, 3000);
}
