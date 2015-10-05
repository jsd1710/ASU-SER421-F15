// ReSharper disable InconsistentNaming
var main;
(function (main) {
    var XmlParser = (function () {
        function XmlParser() {
        }
        XmlParser.startParsing = function (xmlDoc) {
            main.mainTournament.cleanData();
            //if not a xml dom object
            if (!$.isXMLDoc(xmlDoc)) {
                //if it is a url, get the document
                if (main.ValidURL(xmlDoc)) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", xmlDoc, false);
                    xmlhttp.send();
                    var xmlDoc = xmlhttp.responseXML;
                    XmlParser.startParsing(xmlDoc);
                }
                else
                    xmlDoc = jQuery.parseXML(xmlDoc); //otherwise it is likely a string representing the tournament, parse to XML Dom object.
            }
            var x = xmlDoc.getElementsByTagName("tournament"); //xmlDoc.documentElement.childNodes;
            for (var i = 0; i < x.length; i++) {
                try {
                    var nn = "nn";
                    var nv = "nv";
                    if (x[i].nodeName != undefined)
                        nn = x[i].nodeName;
                    if (x[i].nodeValue != undefined)
                        nv = x[i].nodeValue;
                    if (x[i].nodeName.indexOf("tournament") > -1)
                        this.startTournamentElementParse(x[i]);
                }
                catch (e) {
                    console.log("Try catch error: " + e.message);
                    continue;
                }
            }
            main.mainTournament.afterLoadCheck();
            var json = main.JsonParser.toJson(main.mainTournament);
            console.log("Xml Parse Done: " + json);
            return json;
        };
        XmlParser.startTournamentElementParse = function (tournamentNode) {
            var x = tournamentNode.childNodes;
            for (var i = 0; i < x.length; i++) {
                try {
                    var nn = "nn";
                    var nv = "nv";
                    if (x[i].nodeName != undefined)
                        nn = x[i].nodeName;
                    if (x[i].nodeValue != undefined)
                        nv = x[i].nodeValue;
                    if (x[i].nodeName.indexOf("tournament-metadata") > -1)
                        this.startTournamentMetadetaParse(x[i]);
                    else if (x[i].nodeName.indexOf("player") > -1)
                        this.startPlayerParse(x[i]);
                }
                catch (e) {
                    console.log("Try catch error: " + e.message);
                    continue;
                }
            }
        };
        XmlParser.startTournamentMetadetaParse = function (tournamentMetaDataNode) {
            var attributes = tournamentMetaDataNode.attributes;
            //Attributes
            main.mainTournament.name = tournamentMetaDataNode.getAttribute("tournament-name");
            main.mainTournament.start_date = tournamentMetaDataNode.getAttribute("start-date-time");
            main.mainTournament.end_date = tournamentMetaDataNode.getAttribute("end-date-time");
            main.mainTournament.siteCity = tournamentMetaDataNode.getAttribute("site-city");
            main.mainTournament.siteCountry = tournamentMetaDataNode.getAttribute("site-country");
            main.mainTournament.siteName = tournamentMetaDataNode.getAttribute("site-name");
            //Other
            var award = tournamentMetaDataNode.getElementsByTagName("award");
            main.mainTournament.currency = award[0].getAttribute("currency");
            main.mainTournament.value = award[0].getAttribute("value");
            var course = tournamentMetaDataNode.getElementsByTagName("course");
            main.mainTournament.par = course[0].getAttribute("par");
            main.mainTournament.yardage = course[0].getAttribute("yardage");
            var round = tournamentMetaDataNode.getElementsByTagName("round");
            main.mainTournament.number = round[0].getAttribute("number");
            main.mainTournament.status = round[0].getAttribute("status");
        };
        //Parse player node, add info as new player to tournament player object while traversing the dom object
        XmlParser.startPlayerParse = function (playerNode) {
            var newPlayer = new main.Player();
            //PlayerMetaInfo first
            var metaDeta = playerNode.getElementsByTagName("player-metadata");
            var namedata = metaDeta[0].getElementsByTagName("name");
            //Attributes
            newPlayer.first = namedata[0].getAttribute("first");
            newPlayer.last = namedata[0].getAttribute("last");
            //Now playerstats
            var playerStats = playerNode.getElementsByTagName("player-stats");
            newPlayer.score = playerStats[0].getAttribute("score");
            newPlayer.score = main.replaceAll("\\+", "", newPlayer.score);
            newPlayer.scoreUnits = playerStats[0].getAttribute("score-units");
            var playerstatsgolf = playerStats[0].getElementsByTagName("player-stats-golf");
            var statsgolfround = playerstatsgolf[0].getElementsByTagName("stats-golf-round");
            var statsgolfhole = statsgolfround[0].getElementsByTagName("stats-golf-hole");
            newPlayer.hole = statsgolfhole[0].getAttribute("hole");
            main.mainTournament.players.push(newPlayer);
        };
        return XmlParser;
    })();
    main.XmlParser = XmlParser;
})(main || (main = {}));
//# sourceMappingURL=xmlparser.js.map