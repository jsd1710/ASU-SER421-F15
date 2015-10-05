// ReSharper disable InconsistentNaming

module main {
    

    export class JsonParser {


      static  toJson(origTournament: Tournament) {

  

          var container = new Object();
          var tournament = new Object(); /* Tournament Info */
          Object.defineProperty(tournament, 'name', {
              get: function () { return origTournament.name; },
              enumerable: true
          });
          Object.defineProperty(tournament, 'start date', {
              get: function () { return origTournament.start_date; },
              enumerable: true
          });
          Object.defineProperty(tournament, 'end date', {
              get: function () { return origTournament.end_date; },
              enumerable: true
          });
          Object.defineProperty(tournament, 'award', {
              get: function () { return origTournament.value; },
              enumerable: true
          });
          Object.defineProperty(tournament, 'yardage', {
              get: function () { return origTournament.yardage; },
              enumerable: true
          });
          Object.defineProperty(tournament, 'par', {
              get: function () { return origTournament.par; },
              enumerable: true
          });
          Object.defineProperty(tournament, 'round', {
              get: function () { return origTournament.number; },
              enumerable: true
          });
          //Object.defineProperty(tournament, 'players', {
          //    get: function () { return origTournament.players.length; },
          //    enumerable: true
          //});

          /* Players */


         

          var playerArray = this.getPlayerArray(origTournament.players);


          Object.defineProperty(container, 'tournament', {
              get: function () { return tournament; },
              enumerable: true
          });

          Object.defineProperty(tournament, 'players', {
              get: function () { return playerArray; },
              enumerable: true
          });

          return replaceAll("_", " ", JSON.stringify(container, undefined, 4));

        }


        static getPlayerArray(playerArray: Array<Player>, returnJson = false) {

            var newPlayerArray = Array<Object>();

            playerArray.forEach(function (k) {

                var newPlayer = JsonParser.getPlayerObject(k);

                newPlayerArray.push(newPlayer);

            });

            if (returnJson)
                return replaceAll("_", " ", JSON.stringify(newPlayerArray, undefined, 4));
            else
                return newPlayerArray;
        }

        static getPlayerObject(player: Player, returnJson = false) {
            
            var newPlayer = new Object();


            Object.defineProperty(newPlayer, 'lastname', {
                get: function () { return player.last; },
                enumerable: true
            });

            if (!player.hasOwnProperty("firstinitial"))
                Object.defineProperty(newPlayer, 'firstinitial', {
                    get: function() { return player.first.charAt(0); },
                    enumerable: true
                });
            else newPlayer["firstinitial"] = player["firstinitial"];

            Object.defineProperty(newPlayer, 'score', {
                get: function () { return player.score; },
                enumerable: true
            });
            Object.defineProperty(newPlayer, 'hole', {
                get: function () { return player.hole; },
                enumerable: true
            });


            if (player.hasOwnProperty("projectedScore")) {
                Object.defineProperty(newPlayer, 'projectedScore', {
                    get: function () { return player["projectedScore"]; },
                    enumerable: true
                });
            }

            if (player.hasOwnProperty("winnings")) {
                Object.defineProperty(newPlayer, 'winnings', {
                    get: function () { return player["winnings"]; },
                    enumerable: true
                });
            }

            if (returnJson)
                return replaceAll("_", " ", JSON.stringify(newPlayer, undefined, 4));
            else
                return newPlayer;
        }

     
   
        /* { "tournament":
         {  "name": "British Open", 	"start date": " ", "end date": " ", 	"award": 840000, 	"yardage": 6905, 	"par": 71, 	"round": 1, 	"players": 8 },
         "players": [  {          "lastname": "Montgomerie", "firstinitial": "C", "score": -3, "hole": 17 }, 
         {          "lastname": "Fulke", "firstinitial": "P", "score": -5, "hole": "finished" }     ] } */

       static  fromJson(json: string) {
            var newjson = replaceAll('“', '"', json);
            newjson = replaceAll('”', '"', newjson);

            var jsonObj = JSON.parse(newjson);



            mainTournament.cleanData();


            //Setup Tournament data
            var tournamentObject = jsonObj.tournament;

            mainTournament.name = tournamentObject.name;

            mainTournament.end_date = tournamentObject["end date"];
            mainTournament.start_date = tournamentObject["start date"];

            mainTournament.value = tournamentObject.award;
            mainTournament.yardage = tournamentObject.yardage;
            mainTournament.par = tournamentObject.par;

            mainTournament.number = tournamentObject.round;


            tournamentObject.players.forEach(function(k) {
            
                var newPlayer = new Player;
                newPlayer.hole = k.hole;
                newPlayer.last = k.lastname;
                newPlayer.first = k.firstinitial;
                newPlayer.score = k.score;

                mainTournament.players.push(newPlayer);

            });

            mainTournament.afterLoadCheck();

        }

        static fromJsonToObjPlayer(jsonInputString: string) {

            var parsedJsonString = JSON.parse(jsonInputString);

            if (!parsedJsonString.hasOwnProperty("score") || !parsedJsonString.hasOwnProperty("hole") || !parsedJsonString.hasOwnProperty("firstinitial") || !parsedJsonString.hasOwnProperty("lastname")) {
                var error = "Error: Invalid Json. Player is missing property a required property: 'firstinitial', 'lastname', 'hole', or 'score'";
                throw error;
            }

            var newPlayer = new Player;
            newPlayer.hole = parsedJsonString.hole;
            newPlayer.last = parsedJsonString.lastname;
            newPlayer.first = parsedJsonString.firstinitial;
            newPlayer.score = parsedJsonString.score;

            return newPlayer;

        }


    


    }
}