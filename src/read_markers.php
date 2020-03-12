<?php
    require_once('database_config.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DATABASE_NAME);
    $dataArray = array();
    $gameName = $_POST['gameName'];
    $sql = "SELECT `latitude`, `longitude`, `type`, `title` FROM `gameconfigs` WHERE `gameName` = '$gameName'";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        array_push($dataArray, $row);
    }
    echo json_encode($dataArray);
?>
