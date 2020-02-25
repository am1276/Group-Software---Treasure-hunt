<?php
    $conn = new mysqli('localhost', 'root', 'root', 'mvpdb');
    $title = $_POST['title'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $type = $_POST['type'];
    $gameName = $_POST['gameName'];
    $sql = "INSERT INTO `testmarkers` (`latitude`, `longitude`, `type`, `title`, `gameName`) VALUES ('$latitude', '$longitude', '$type', '$title', '$gameName')";
    if ($conn->query($sql) === TRUE) {
        echo "Successfully inserted markers.";
    } else {
        echo "Error inserting markers.";
    }
?>
