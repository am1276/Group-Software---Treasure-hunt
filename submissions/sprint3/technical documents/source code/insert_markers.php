<?php
    require_once('database_config.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DATABASE_NAME);
    $title = $_POST['title'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $question = $_POST['question'];
    $answer = $_POST['answer'];
    $type = $_POST['type'];
    $gameName = $_POST['gameName'];
    $sql = "INSERT INTO `testmarkers` (`latitude`, `longitude`, `question`, `answer`, `type`, `title`, `gameName`) VALUES ('$latitude', '$longitude', '$question', '$answer', '$type', '$title', '$gameName')";
    if ($conn->query($sql) === TRUE) {
        echo "Successfully saved your game";
    } else {
        echo "Failed to save your game";
    }
?>
