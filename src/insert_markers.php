<?php
    require_once('database_config.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DATABASE_NAME);
    $title = $_POST['title'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $type = $_POST['type'];
    $gameName = $_POST['gameName'];
    $sql = "INSERT INTO `gameconfigs` (`latitude`, `longitude`, `type`, `title`, `gameName`) VALUES ('$latitude', '$longitude', '$type', '$title', '$gameName')";
    if ($conn->query($sql) === TRUE) {
        echo "Successfully saved your game";
    } else {
        echo "Failed to save your game. Contact a developer";
    }
?>
