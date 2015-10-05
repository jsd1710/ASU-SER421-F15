// ReSharper disable InconsistentNaming
var main;
(function (main) {
    var Tournament = (function () {
        function Tournament() {
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
            this.players = new Array();
        }
        Tournament.prototype.cleanData = function () {
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
        };
        Tournament.prototype.leaderboard = function (inputJsonString) {
            if (inputJsonString === void 0) { inputJsonString = null; }
            if (inputJsonString != null)
                main.startFromJson(inputJsonString);
            this.players.sort(function (a, b) {
                return parseInt(a.score) - parseInt(b.score);
            });
            main.setJson();
            main.rootScope.$apply();
            return main.JsonParser.toJson(this);
        };
        Tournament.prototype.projectScoreByIndividual = function (inputJsonString) {
            var playerObj = main.JsonParser.fromJsonToObjPlayer(inputJsonString);
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
                get: function () { return projectedScore; },
                set: function (value) { projectedScore = value; },
                enumerable: true
            });
            var playerJsonObj = main.JsonParser.getPlayerObject(playerObj, true);
            return playerJsonObj;
        };
        Tournament.prototype.projectScoreByHole = function (inputJsonString) {
            var collectiveRateOfProgress = 0;
            //Calculate CRP, if given a CRP use it instead
            if (main.mainTournament.players.length == 0)
                throw "Error: There currently no players to calculate a collective rate of progress. This function requires xml or json (representing a tournament) to be loaded first!";
            main.mainTournament.players.forEach(function (k) {
                var score = k.score;
                var roundI = k.hole;
                if (roundI.toString().toLowerCase() == "finished")
                    roundI = "18";
                var avgPerHole = parseFloat(score) / parseInt(roundI);
                collectiveRateOfProgress += avgPerHole;
            });
            collectiveRateOfProgress = collectiveRateOfProgress / main.mainTournament.players.length;
            var playerObj = main.JsonParser.fromJsonToObjPlayer(inputJsonString);
            var projectedScore;
            var score = parseFloat(playerObj.score);
            var roundI = playerObj.hole;
            if (roundI.toString().toLowerCase() == "finished") {
                projectedScore = score;
                roundI = "18";
            }
            else if (parseInt(roundI) > 17)
                projectedScore = score;
            else {
                projectedScore = score + (18 - parseFloat(roundI)) * (collectiveRateOfProgress);
            }
            Object.defineProperty(playerObj, 'projectedScore', {
                get: function () { return projectedScore; },
                set: function (value) { projectedScore = value; },
                enumerable: true
            });
            var playerJsonObj = main.JsonParser.getPlayerObject(playerObj, true);
            return playerJsonObj;
        };
        Tournament.prototype.projectedLeaderboard = function (method, inputJsonString) {
            if (inputJsonString === void 0) { inputJsonString = null; }
            if (inputJsonString != null)
                main.startFromJson(inputJsonString);
            main.mainTournament.players.forEach(function (k) {
                var jsonObject = main.JsonParser.getPlayerObject(k, true);
                var playerJsonWithProjectScore = method(jsonObject);
                var parsedJson = JSON.parse(playerJsonWithProjectScore);
                Object.defineProperty(k, 'projectedScore', {
                    get: function () { return parsedJson["projectedScore"]; },
                    set: function (value) { return value; },
                    enumerable: true,
                    configurable: true
                });
            });
            main.mainTournament.players.sort(function (a, b) {
                return parseFloat(a["projectedScore"]) - parseFloat(b["projectedScore"]);
            });
            main.setJson();
            main.rootScope.$apply();
            return main.JsonParser.toJson(this);
        };
        Tournament.prototype.afterLoadCheck = function () {
            if (this.number.toString() == "4" && (this.status.toLowerCase() == "complete" || this.status.toLowerCase() == "completed")) {
                this.leaderboard();
                var enclosure = this;
                Object.defineProperty(this, 'winner', {
                    get: function () { return enclosure.players[enclosure.players.length - 1]; },
                    enumerable: true
                });
                this.getWinner = function () {
                    return this.winner.last;
                };
                //Winners winnings
                Object.defineProperty(enclosure.players[enclosure.players.length - 1], 'winnings', {
                    get: function () { return parseFloat(enclosure.value) * .5; },
                    enumerable: true
                });
                Object.defineProperty(enclosure.players[enclosure.players.length - 2], 'winnings', {
                    get: function () { return parseFloat(enclosure.value) * .3; },
                    enumerable: true
                });
                Object.defineProperty(enclosure.players[enclosure.players.length - 3], 'winnings', {
                    get: function () { return parseFloat(enclosure.value) * .2; },
                    enumerable: true
                });
            }
        };
        Tournament.prototype.printLeaderboard = function () {
            console.log(main.JsonParser.toJson(this));
        };
        return Tournament;
    })();
    main.Tournament = Tournament;
    var Player = (function () {
        function Player() {
            this.score = " ";
            this.scoreUnits = " ";
            this.hole = " ";
            this.first = " ";
            this.last = " ";
        }
        return Player;
    })();
    main.Player = Player;
})(main || (main = {}));
//# sourceMappingURL=tournament.js.map