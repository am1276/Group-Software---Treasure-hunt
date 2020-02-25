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
    if (hamburgerState == 0) {
        document.getElementById("hamburgermenu").style.width = "300px";
        document.getElementById("hamburger").style.right = "300px";
        document.getElementById("hamburger").style.filter = "brightness(50%)";
        document.getElementById("score").style.width = "0px";
        document.getElementById("score").style.fontSize = "0px";
        hamburgerState = 1;
    } else {
        document.getElementById("hamburgermenu").style.width = "0px";
        document.getElementById("hamburger").style.right = "0px";
        document.getElementById("hamburger").style.filter = "brightness(100%)";
        document.getElementById("score").style.width = "45%";
        document.getElementById("score").style.fontSize = "125%";
        hamburgerState = 0;
    }
}
