NOTE THAT THE CURRENT SYSTEM IS A MINIMUM VIABLE PRODUCT AND IS SUBJECT TO SIGNIFICANT CHANGE. Also note that 
based on the security of the website you host the system off of, the Google Maps api may not function properly.

Ideally, to run the system you should host it locally using a server stack. To recreate the exact conditions of development and
how I have reviewed the system, I recommend using a WAMP stack (mysql, php and apache).

For convenience, save all source code files into one directory.

Before proceeding, I advise downloading and making use of the examplar database mvpdb.sql to test the system 
with some previously generated data. Please ensure that you correctly edit the database_config.php file to suit
the configuration of your mysql installation in order for the system to be able to successfully communicate with 
the database (via a direct connection).

To run the system from the perspective of a player, launch the player_UI.html file on a server.
To run the system from the perspective of a gamekeeper, launch the gamekeeper_UI.html file instead.
