<?php
    session_start();
 ?>
<html>
    <head>
        <title>Treasure hunt game</title>
        <meta name="viewport" content="initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="login_styling.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap" rel="stylesheet">
    </head>
<body>

<?php require 'player_login.php'; ?>
<div id="container">
    <h1 style="font-family:'Roboto';vertical-align:middle;">Group T's Treasure Hunt Game</h1>
    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
        <input type="text" name="playername" value="<?php echo $playername ?>" placeholder="Enter a username" />
        <br>
        <input type="password" name="password" placeholder="Enter your password" />
        <br>
        <input id="submit" style="font-family:'Roboto';" type="submit" value="Play" name="submit" />
        <br>
        <span style="font-family:'Roboto';color:red;"><?php echo $error ?></span>
    </form>
</div>

</body>
</html>
