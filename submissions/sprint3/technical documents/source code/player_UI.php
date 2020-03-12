<?php
    session_start();
 ?>
<html>
    <head>
        <title>Treasure hunt game</title>
        <meta name="viewport" content="initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="player_UI_styling.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap" rel="stylesheet">
    </head>
    <body>
        <?php
            if (!isset($_SESSION["playerName"])) {
                header("Location: player_login.php");
            }
        ?>
        <div id="hamburger" style="z-index: 100;" onclick="expandCloseMenu()">
            <div class="hamburgerLines" style="top: 12px;"></div>
            <div class="hamburgerLines" style="top: 24px;"></div>
            <div class="hamburgerLines" style="top: 36px;"></div>
        </div>
        <div id="hamburgermenu" style="z-index: 100;">
            <h1 id="leaderboardheader" style="font-family:'Roboto'; transition:0.5s; text-align:center;">Top 10 players</h1>
            <div id="leaderboard" style="font-family:'Roboto'; transition:0.5s; text-align:center;"></div>
        </div>
        <div id="container">
            <div id="marker"></div>
            <div id="map"></div>
            <div id="objective"><div style="font-family:'Roboto';">Find location: loading...</div></div>
            <div id="clue">Nearest clue: loading...</div>
            <div id="score">Score: loading...</div>
            <div id="marker"></div>
        </div>
        <?php $gameName = $_SESSION["gameName"]; $playerName = $_SESSION["playerName"]; $id = $_SESSION["ID"];?>
        <script> var gameName = "<?php echo $gameName; ?>" ; var playerName = "<?php echo $playerName; ?>" ; var playerID = "<?php echo $id; ?>" ; </script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcKvtKpGcA9K21EskOrTgXWSGq5VFVef0&callback=initialiseUserMap&libraries=geometry"
        async defer></script>
        <script>    window.onbeforeunload = function() {
                        return "If you leave, you will lose your score. Leave?";
                    };
        </script>
        <script src="player_map.js"></script>
    </body>
</html>
