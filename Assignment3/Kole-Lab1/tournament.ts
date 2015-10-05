// ReSharper disable InconsistentNaming


module main {


    export class Tournament {
        
        name: string = "";
        start_date: string = "";
        end_date: string = "";
        siteName: string = "";
        siteCity: string = "";
        siteCountry: string = "";

        value: string = "";
        currency: string = "";

        yardage: string = "";
        par: string = "";

        number: string = "";
        status: string = "";

        players: Player[] = new Array<Player>();


        cleanData() {
            this.name = "";
            this.start_date = "";
            this.end_date = "";
            this.siteName = "";
            this.siteCity = "";
            this.siteCountry = "";

            this.value = "";
            this.currency = "";

            this.yardage = "";
            this.par = "";

            this.number = "";
            this.status = "";
            this.players.length = 0;
        }


        leaderboard(inputJsonString = null) {


            if (inputJsonString != null)
                startFromJson(inputJsonString);

            this.players.sort(function(a: Player, b: Player) {

                return parseInt(a.score) - parseInt(b.score);

            });


            setJson();
            rootScope.$apply();

            return JsonParser.toJson(this);


        }

        projectScoreByIndividual(inputJsonString) {
            

            var playerObj = JsonParser.fromJsonToObjPlayer(inputJsonString);

            

            var projectedScore;

            var score = parseFloat(playerObj.score);
            var roundI = playerObj.hole;
            if (roundI.toString().toLowerCase() == "finished")
                projectedScore = score;
            else if (parseInt(roundI) > 17)
                projectedScore = score;
            else {
                var avgPerHole = score / parseInt(roundI);
                projectedScore = score + (18.0 - parseFloat(roundI)) * avgPerHole;
            }
            
            Object.defineProperty(playerObj, 'projectedScore', {
                get: function() { return projectedScore; },
                set: function(value) { projectedScore = value },
                enumerable: true
            });
        
            var playerJsonObj = JsonParser.getPlayerObject(playerObj, true);

            
            return playerJsonObj;
        
        }

        projectScoreByHole(inputJsonString) {


            var collectiveRateOfProgress = 0;

            //Calculate CRP, if given a CRP use it instead
            if (mainTournament.players.length == 0)
                throw "Error: There currently no players to calculate a collective rate of progress. This function requires xml or json (representing a tournament) to be loaded first!";

            mainTournament.players.forEach(function(k) {


                var score = k.score;
                var roundI = k.hole;
                if (roundI.toString().toLowerCase() == "finished")
                    roundI = "18";


                var avgPerHole = parseFloat(score) / parseInt(roundI);
                collectiveRateOfProgress += avgPerHole;


            });
            collectiveRateOfProgress = collectiveRateOfProgress / mainTournament.players.length;

            var playerObj = JsonParser.fromJsonToObjPlayer(inputJsonString);

            var projectedScore;

            var score = parseFloat(playerObj.score);
            var roundI = playerObj.hole;
            if (roundI.toString().toLowerCase() == "finished") {
                projectedScore = score;
                roundI = "18";
            } else if (parseInt(roundI) > 17)
                projectedScore = score;
            else {


                projectedScore = score + (18 - parseFloat(roundI)) * (collectiveRateOfProgress);


            }

            Object.defineProperty(playerObj, 'projectedScore', {
                get: function() { return projectedScore; },
                set: function(value) { projectedScore = value },
                enumerable: true
            });
            var playerJsonObj = JsonParser.getPlayerObject(playerObj, true);

            return playerJsonObj;


        }

        projectedLeaderboard(method: Function, inputJsonString = null) {

            if (inputJsonString != null)
                startFromJson(inputJsonString);

            mainTournament.players.forEach(function(k) {

                var jsonObject = JsonParser.getPlayerObject(k, true);
                var playerJsonWithProjectScore = method(jsonObject);
                var parsedJson = JSON.parse(playerJsonWithProjectScore);
                Object.defineProperty(k, 'projectedScore', {
                    get: function() { return parsedJson["projectedScore"] },
                    set: function(value) { return value; },
                    enumerable: true,
                    configurable: true
                });

            });

            mainTournament.players.sort(function(a: Player, b: Player) {

                return parseFloat(a["projectedScore"]) - parseFloat(b["projectedScore"]);

            });

            setJson();
            rootScope.$apply();

            return JsonParser.toJson(this);
        }


        afterLoadCheck() {
            
            if (this.number.toString() == "4" && (this.status.toLowerCase() == "complete" || this.status.toLowerCase() == "completed"  )) {
                this.leaderboard();
                var enclosure = this;
                Object.defineProperty(this, 'winner', {
                    get: function() { return enclosure.players[enclosure.players.length - 1] },
                    enumerable: true
                });


                (<any>this).getWinner = function() {
                    return this.winner.last;
                }

                //Winners winnings
                Object.defineProperty(enclosure.players[enclosure.players.length - 1], 'winnings', {
                    get: function() { return parseFloat(enclosure.value) * .5; },
                    enumerable: true
                });
                Object.defineProperty(enclosure.players[enclosure.players.length - 2], 'winnings', {
                    get: function() { return parseFloat(enclosure.value) * .3; },
                    enumerable: true
                });
                Object.defineProperty(enclosure.players[enclosure.players.length - 3], 'winnings', {
                    get: function() { return parseFloat(enclosure.value) * .2; },
                    enumerable: true
                });



            }
        }

        printLeaderboard() {
            console.log(JsonParser.toJson(this));
        }


    }


    export class Player {

        score: string = " ";
        scoreUnits: string = " ";
        hole: string = " ";

        first: string = " ";
        last: string = " ";


    }


}