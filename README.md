# Treasure hunt game
A game which makes use of your device's GPS to test your navigation skills. Find markers on your interactive map and earn points for
discovering them; find clues to aid your journey in finding your main objectives and earn big points for getting as close them as possible.

# Motivation
Our project exists to assist new students get around and discover the University of Exeter campus by introducing locations with a fun and
simple to play game. When developing our project, we had flexibility in mind; this app doesn't have to be used with the UoE campus, but can
also be used anywhere else.

# Coding conventions
When developing our code, we aim to use the conventions described by w3schools. Example: https://www.w3schools.com/js/js_conventions.asp

# Tech used
In our code, we used the following (all is integrated within code and no installations outside database tech are required):
  - HTML
  - CSS
  - Javascript
  - PHP 7.3.12
  - AJAX/Jquery
  - Google Maps API
  - MySQL/MariaDB (you can use any database tool which allows for a direct connection)
  
# Features
  - Full, pure use of GPS tracking for the player
  - Flexible configuration of games that can be set up for players
  - Quick and easy access into games using randomly generated passwords
  - Dynamic tracking and automatic detection of clue markers
  - Exciting mechanic of finding main objectives which requires players to make concise decisions to avoid losing score
  - Live-time leaderboard which highlights the highest scoring players

# APIs
In our app, we use the Google Maps API for most things. You can refer to the Google Maps API documentation here: https://developers.google.com/maps/gmp-get-started

# Installation and deployment
You will need a database management system which can be connected to with a username and password, along with its address to access it
given that this project makes use of direct connections to a database using PHP. You may follow the ER diagram supplied in this repository
to create your own database, making sure to EXACTLY copy the fields or alternatively you can import the provided SQL script. Before you 
make use of this app, ENSURE that you have supplied the database address, username, password and database name within database_config.php 
so that you can successfully communicate between the database and the app.

Once again, make sure that you use that exact fields as denoted in the ER diagram. Note that the passwords table has a foreign key field
'GameName' and the players table has a foreign key field 'OneTimePassword'.

Other than that, there is not much other work needed to install and deploy the app; download or clone the src folder and run the code all
from the same directory on your server. You can also modify the require_once() parameter of each PHP file to a directory path to the current PHP
file if you want to segment the code into separate directories to structure your server.

Players can play by running index.php where they are introduced to the login screen. Players cannot access the game without a password as
a session is generated when they log in.

Gamekeepers can create games by running gamekeeper.html.

# How to use
Gamekeepers must create a game full of markers. To do this, run gamekeeper.html where you can do the following:
  - left click to place main objective markers. These markers offer the most score and are what determines the length of a game; a player
  must deplete all main objectives to finish the game. Ideally, you should place main markers in places of importance for the player.
  - right click to place clue markers. These markers offer some score to the player when found and provide a clue to help find the main
  objective marker. Ideally, these markers should be placed in mere places of interest. Make sure you place enough clue markers down to
  avoid making the game too hard.
  - the activity log shows the gamekeeper what they have done in their session.
  - gamekeepers can submit their game configuration by pressing the submit button. They are prompted for a game name to distinguish between
  games in the database, the number of teams that will be playing and whether the gamekeeper would like to wipe their map of markers.
  - gamekeepers can press the clear markers button to prematurely wipe their map of markers and start building their config again.
  - when a game is created, the gamekeeper is given a list of all one time passwords. The gamekeeper should take note of these. The gamekeeper
  is expected to distribute these passwords to players (via email etc) so that they can play the game. Multiple players can use the same password
  to form teams, so it is up to the gamekeeper who they distribute to and how many of the same key the distribute to whom.
  
Players must find all main objectives to finish the game. Winning is based on distance and score rather than if you can finish
the game the fastest, accommodating for everyone and letting players play at their own pace. Main objectives can be hard to find given
there is no indication of where they are other than their name. Fear notm, to help players can find clue markers to assist their hunt.
  - players can press the blue objective bar at the bottom of the screen to query whether they are close to a main objective. If they aren't
  they will lose score, otherwise if they are, they obtain score based on how close they are to the main objective.
  - players will automatically detect clue markers near them with a distance counter in metres showing how far a player is to the closest
  clue. Players can go to clues to bag some score and are given a distance as well as a direction from the clue to the main marker when found.
  - players can press the hamburger to view the live-time leaderboard of top scoring players.
  
# Credits, group T
  - Ángel Mig
  - Robert Szeto
  - Ahmed Tumia
  - Hao Zhang
  - Kai Zarzycki
  - Alex Stagg
  - Alex Powell-Tuck
  
# License
MIT License

Copyright (c) 2020 group T

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
