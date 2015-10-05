// ReSharper disable InconsistentNaming

module main {

    /* Main */

    var xmlhttp: XMLHttpRequest;

    export var mainTournament: Tournament = new Tournament();
    var golfJSON = "";
    export var rootScope: any;

    export function startFromJson(json: any) {

        JsonParser.fromJson(json);

        setJson();
        mainTournament.afterLoadCheck();
        rootScope.$apply();
    }

    export function startFromDefaultXml(which: any) {
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

        XmlParser.startParsing(xmlDoc);

     

        setJson();

        rootScope.$apply();


    }

    //Updates "Current Default-JSON View" on html page
    export function setJson() {
        golfJSON = JsonParser.toJson(mainTournament);
    }

    export function leaderboard(jsonInputString) {
     return mainTournament.leaderboard(jsonInputString); }
    export function projectScoreByIndividual(jsonInputString) { return  mainTournament.projectScoreByIndividual(jsonInputString); }
    export function projectScoreByHole(jsonInputString) { return  mainTournament.projectScoreByHole(jsonInputString); }
    export function projectedLeaderboard(method: Function, inputJsonString = null) { return  mainTournament.projectedLeaderboard(method, inputJsonString); }


    //Validate data on mainTournament object
    export function validateData(): boolean {

        if (mainTournament.players.length == 0 && mainTournament.name == "") {
            console.log("Validate Data Error: A tournament may not have been loaded from JSON/XML.");
            return null;
        }

        var ErrorLog = new Array<string>();


        if (mainTournament.status == "completed") {

            for (var i = 0; i < mainTournament.players.length; i++) {

                if (mainTournament.players[i].hole.toString().toLowerCase() != "finished") {
                    var error = "Round Error: Round " + mainTournament.number + " is marked as finish but " + mainTournament.players[i].first + " " + mainTournament.players[i].last + " is on hole " + mainTournament.players[i].hole;
                    ErrorLog.push(error);
                }

            }

        }

        if (+mainTournament.number > 4) {
            var error = "Tournament Rounds Error: This tournament is listed as having more than 4 rounds, but tournaments may not have more than 4 rounds.";
            ErrorLog.push(error);
        }

        for (var i = 0; i < mainTournament.players.length; i++) {

            if (mainTournament.players[i].hole != "finished")
                if (+mainTournament.players[i].hole > 17) {
                    //TODO Check for Tiebreakers
                    var error = " Player Round Error: Round " + mainTournament.players[i].first + " " + mainTournament.players[i].last + " is marked as being on hole " + mainTournament.players[i].hole + " which is >17 and therefore should be marked as finished.";

                    ErrorLog.push(error);
                }

        }

        console.log("Validate Data Errors: ");
        console.log(ErrorLog);

        if (ErrorLog.length > 0)
            return false;
        else return true;


    }


    /* Window Loaded */

    window.onload = function() {


        document.getElementById("start").onclick = function () {


            startFromDefaultXml(1);
        }
        document.getElementById("start0").onclick = function () {
            var xml = (<any>document.getElementById('txtXml')).value;

            startFromDefaultXml(xml);
        }
        document.getElementById("start2").onclick = function () {

            startFromDefaultXml(2);
        }
        document.getElementById("start3").onclick = function () {

            startFromDefaultXml(3);
        }

        /* Angular Setup */


        var myApp = angular.module('myApp', []).run(function($rootScope) {

            rootScope = $rootScope;

        }).controller('players', function($scope, $rootScope) {


            $scope.players = mainTournament.players;
            $scope.json = golfJSON;

      

            $scope.$watch('players', function(newVal, oldVal) {

                $scope.json = golfJSON;

              //  var index = getRandomInt(0, $scope.players.length - 1);

               // $scope.players[index].first += " ";

            }, true);


        });


        angular.element(document).ready(function() {

            angular.bootstrap(document, ['myApp']);
        });



        



    }

}