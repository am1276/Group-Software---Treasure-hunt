<?php
    require_once('database_config.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DATABASE_NAME);
    $oneTimePassword = $_POST['oneTimePassword'];
    $gameName = $_POST['gameName'];
    $sql = "INSERT INTO `passwords` (`OneTimePassword`, `GameName`) VALUES ('$oneTimePassword', '$gameName')";
    if ($conn->query($sql) === TRUE) {
        echo $oneTimePassword;
    } else {
        echo "Failed to save your game. Contact a developer";
    }
?>
