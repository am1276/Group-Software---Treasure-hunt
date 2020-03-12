<?php
    require_once('database_config.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DATABASE_NAME);
    $playerID = $_POST['playerID'];
    $score = $_POST['score'];
    $sql = "UPDATE players SET Score = '$score' WHERE PlayerID = '$playerID'";
    if ($conn->query($sql) === TRUE) {
        echo "Successfully updated score";
    } else {
        echo "Failed to update score. Contact a developer.";
    }
?>
