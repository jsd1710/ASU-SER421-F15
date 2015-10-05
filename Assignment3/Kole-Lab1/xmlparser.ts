// ReSharper disable InconsistentNaming

module main {


    export class XmlParser {

  
       static startParsing(xmlDoc: any) {
     
            mainTournament.cleanData();
          
           //if not a xml dom object
            if (!$.isXMLDoc(xmlDoc)) {

                //if it is a url, get the document
                if (ValidURL(xmlDoc)) {
                    var xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("GET", xmlDoc, false);
                    xmlhttp.send();
                    var xmlDoc = xmlhttp.responseXML;


                    XmlParser.startParsing(xmlDoc);
                } else  xmlDoc = jQuery.parseXML(xmlDoc); //otherwise it is likely a string representing the tournament, parse to XML Dom object.


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

                } catch (e) {
                    console.log("Try catch error: " + e.message);
                    continue;
                }
           }

            mainTournament.afterLoadCheck();

           var json = JsonParser.toJson(mainTournament);
           console.log("Xml Parse Done: " + json);
           return json;
       }


      static startTournamentElementParse(tournamentNode: any) {
           

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

                } catch (e) {
                    console.log("Try catch error: " + e.message);
                    continue;
                }
            }

        }

      static  startTournamentMetadetaParse(tournamentMetaDataNode: any) {
            
            var attributes = tournamentMetaDataNode.attributes;
          
            //Attributes
            mainTournament.name = tournamentMetaDataNode.getAttribute("tournament-name");
            mainTournament.start_date = tournamentMetaDataNode.getAttribute("start-date-time");
            mainTournament.end_date = tournamentMetaDataNode.getAttribute("end-date-time");
            mainTournament.siteCity = tournamentMetaDataNode.getAttribute("site-city");
            mainTournament.siteCountry = tournamentMetaDataNode.getAttribute("site-country");
            mainTournament.siteName = tournamentMetaDataNode.getAttribute("site-name");

            //Other

            var award = tournamentMetaDataNode.getElementsByTagName("award");
            mainTournament.currency = award[0].getAttribute("currency");
            mainTournament.value = award[0].getAttribute("value");

            var course = tournamentMetaDataNode.getElementsByTagName("course");
            mainTournament.par = course[0].getAttribute("par");
            mainTournament.yardage = course[0].getAttribute("yardage");


            var round = tournamentMetaDataNode.getElementsByTagName("round");
            mainTournament.number = round[0].getAttribute("number");
            mainTournament.status = round[0].getAttribute("status");

         

        }

        //Parse player node, add info as new player to tournament player object while traversing the dom object
      static  startPlayerParse(playerNode: any) {
           

            var newPlayer = new Player();
            //PlayerMetaInfo first
            var metaDeta = playerNode.getElementsByTagName("player-metadata");
            var namedata = metaDeta[0].getElementsByTagName("name");


            //Attributes
            newPlayer.first = namedata[0].getAttribute("first");
            newPlayer.last = namedata[0].getAttribute("last");


            //Now playerstats
            var playerStats = playerNode.getElementsByTagName("player-stats");

            newPlayer.score = playerStats[0].getAttribute("score");

            newPlayer.score = replaceAll("\\+", "", newPlayer.score);

            newPlayer.scoreUnits = playerStats[0].getAttribute("score-units");

            var playerstatsgolf = playerStats[0].getElementsByTagName("player-stats-golf");
            var statsgolfround = playerstatsgolf[0].getElementsByTagName("stats-golf-round");
            var statsgolfhole = statsgolfround[0].getElementsByTagName("stats-golf-hole");

            newPlayer.hole = statsgolfhole[0].getAttribute("hole");
            
            mainTournament.players.push(newPlayer);
            
        }

     
    }
}