<?php

$playername = $password = $error = "";

if (isset($_POST['submit'])) {
    $playername = htmlentities($_POST['playername']);
    $password = htmlentities($_POST['password']);
    if (empty($playername) || empty($password)) {
        $error = "Please fill all fields.";
    } else {
        require 'database_config.php';
        $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DATABASE_NAME);
        $playername = $conn->real_escape_string($playername);
        $password = $conn->real_escape_string($password);
        $sql = "SELECT * FROM passwords WHERE OneTimePassword = '$password'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $sqlInsertPlayer = "INSERT INTO `players` (`PlayerName`, `OneTimePassword`) VALUES ('$playername', '$password')";
            if ($conn->query($sqlInsertPlayer) === TRUE) {
                $sqlGetPlayerID = "SELECT PlayerID FROM players WHERE PlayerName = '$playername' AND OneTimePassword = '$password'";
                $id = ($conn->query($sqlGetPlayerID))->fetch_assoc();
                $_SESSION["playerName"] = $playername;
                $_SESSION["gameName"] = $row["GameName"];
                $_SESSION["ID"] = $id["PlayerID"];
                header("Location: player_UI.php");
            }
        } else {
            $error = "Invalid password.";
        }
    }
}
?>
