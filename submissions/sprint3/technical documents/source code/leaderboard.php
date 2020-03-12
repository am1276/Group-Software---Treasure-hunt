<?php
    require_once('database_config.php');
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DATABASE_NAME);
    $dataArray = array();
    $sql = "SELECT PlayerName, Score FROM players ORDER BY Score DESC LIMIT 10";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        array_push($dataArray, $row);
    }
    echo json_encode($dataArray);
?>
