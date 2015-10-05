// ReSharper disable InconsistentNaming
var main;
(function (main) {
    /* Main */
    var xmlhttp;
    main.mainTournament = new main.Tournament();
    var golfJSON = "";
    main.rootScope;
    function startFromJson(json) {
        main.JsonParser.fromJson(json);
        setJson();
        main.mainTournament.afterLoadCheck();
        main.rootScope.$apply();
    }
    main.startFromJson = startFromJson;
    function startFromDefaultXml(which) {
        var xmlDoc = which;
        if (!isNaN(which)) {
            xmlhttp = new XMLHttpRequest();
            if (which == 1)
                xmlhttp.open("GET", "golf.xml", false);
            else if (which == 2)
                xmlhttp.open("GET", "golf2.xml", false);
            else if (which == 3)
                xmlhttp.open("GET", "golf3.xml", false);
            xmlhttp.send();
            xmlDoc = xmlhttp.responseXML;
        }
        main.XmlParser.startParsing(xmlDoc);
        setJson();
        main.rootScope.$apply();
    }
    main.startFromDefaultXml = startFromDefaultXml;
    //Updates "Current Default-JSON View" on html page
    function setJson() {
        golfJSON = main.JsonParser.toJson(main.mainTournament);
    }
    main.setJson = setJson;
    function leaderboard(jsonInputString) {
        return main.mainTournament.leaderboard(jsonInputString);
    }
    main.leaderboard = leaderboard;
    function projectScoreByIndividual(jsonInputString) { return main.mainTournament.projectScoreByIndividual(jsonInputString); }
    main.projectScoreByIndividual = projectScoreByIndividual;
    function projectScoreByHole(jsonInputString) { return main.mainTournament.projectScoreByHole(jsonInputString); }
    main.projectScoreByHole = projectScoreByHole;
    function projectedLeaderboard(method, inputJsonString) {
        if (inputJsonString === void 0) { inputJsonString = null; }
        return main.mainTournament.projectedLeaderboard(method, inputJsonString);
    }
    main.projectedLeaderboard = projectedLeaderboard;
    //Validate data on mainTournament object
    function validateData() {
        if (main.mainTournament.players.length == 0 && main.mainTournament.name == "") {
            console.log("Validate Data Error: A tournament may not have been loaded from JSON/XML.");
            return null;
        }
        var ErrorLog = new Array();
        if (main.mainTournament.status == "completed") {
            for (var i = 0; i < main.mainTournament.players.length; i++) {
                if (main.mainTournament.players[i].hole.toString().toLowerCase() != "finished") {
                    var error = "Round Error: Round " + main.mainTournament.number + " is marked as finish but " + main.mainTournament.players[i].first + " " + main.mainTournament.players[i].last + " is on hole " + main.mainTournament.players[i].hole;
                    ErrorLog.push(error);
                }
            }
        }
        if (+main.mainTournament.number > 4) {
            var error = "Tournament Rounds Error: This tournament is listed as having more than 4 rounds, but tournaments may not have more than 4 rounds.";
            ErrorLog.push(error);
        }
        for (var i = 0; i < main.mainTournament.players.length; i++) {
            if (main.mainTournament.players[i].hole != "finished")
                if (+main.mainTournament.players[i].hole > 17) {
                    //TODO Check for Tiebreakers
                    var error = " Player Round Error: Round " + main.mainTournament.players[i].first + " " + main.mainTournament.players[i].last + " is marked as being on hole " + main.mainTournament.players[i].hole + " which is >17 and therefore should be marked as finished.";
                    ErrorLog.push(error);
                }
        }
        console.log("Validate Data Errors: ");
        console.log(ErrorLog);
        if (ErrorLog.length > 0)
            return false;
        else
            return true;
    }
    main.validateData = validateData;
    /* Window Loaded */
    window.onload = function () {
        document.getElementById("start").onclick = function () {
            startFromDefaultXml(1);
        };
        document.getElementById("start0").onclick = function () {
            var xml = document.getElementById('txtXml').value;
            startFromDefaultXml(xml);
        };
        document.getElementById("start2").onclick = function () {
            startFromDefaultXml(2);
        };
        document.getElementById("start3").onclick = function () {
            startFromDefaultXml(3);
        };
        /* Angular Setup */
        var myApp = angular.module('myApp', []).run(function ($rootScope) {
            main.rootScope = $rootScope;
        }).controller('players', function ($scope, $rootScope) {
            $scope.players = main.mainTournament.players;
            $scope.json = golfJSON;
            $scope.$watch('players', function (newVal, oldVal) {
                $scope.json = golfJSON;
                //  var index = getRandomInt(0, $scope.players.length - 1);
                // $scope.players[index].first += " ";
            }, true);
        });
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['myApp']);
        });
    };
})(main || (main = {}));
//# sourceMappingURL=main.js.map