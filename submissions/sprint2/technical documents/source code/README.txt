NOTE THAT THE CURRENT SYSTEM IS A MINIMUM VIABLE PRODUCT AND IS SUBJECT TO SIGNIFICANT CHANGE. Also note that 
based on the security of the website you host the system off of, the Google Maps api used may not function properly.

Ideally, to run the system you should host it locally using a server stack. To recreate the exact conditions of development and
how I have reviewed the system, I recommend using a WAMP stack (mysql, php and apache).

For convenience, save all source code files into one directory.

Before proceeding, I advise downloading and making use of the examplar database mvpdb.sql within the server directory
to obtain the schema necessary to run the system as well as test the system with some previously generated data. Please ensure that you correctly edit the database_config.php file to suit the configuration of your mysql installation in order for the system to be able to successfully communicate with the database (via a direct connection).

To run the system from the perspective of a gamekeeper, launch the gamekeeper_UI.html on a server (have all source code files together in a directory so that code can run smoothly).
As a gamekeeper, you can left click to place main objective markers and right click to place clue/secondary objective markers all over a map of the university campus. Once finished with placing markers, you can save the coordinates of all the markers you have placed onto a database by pressing submit (given that you have linked a database to the system and are using the same schema as mvpdb.sql) where you are prompted to save all your markers under a game name which will be later used by the player to initialise and play the game using your markers.

To run the system from the perspective of a player, launch the player_UI.html file on a server.
Currently, when first loading into a game as a player, you will be prompted to type in the name of a game (which will be the same ones saved on the database by the gamekeeper) so that the system can retreive and initialise all markers into a playable game. When playing, you are tracked using GPS (ensure that you host the system off of a https secure website, or alternatively, locally in order to get Google Map services to work properly) and are given your main objective at the bottom of the screen. In this current state, the player plays and racks up a score by pressing the submit button when they think they are close to the objective area given, only having one chance to guess whether they are in fact at the area or not for each objective given. Score is based off of how close the player is to the objective area, obtaining more score when they are closer to the objective.

If you are using mvpdb.sql to play the game, as a player type 'testgame' when prompted at the start to initialise the previously generated markers.
