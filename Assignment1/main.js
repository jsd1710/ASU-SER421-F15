"use strict";
var xmlhttp;

class GolfTournament
{
    constructor( name, start_date, end_date, award, yardage, par, round, round_completion, playerCount, players )
    {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.award = award;
        this.yardage = yardage;
        this.par = par;
        this.round = round;
        this.round_completion = round_completion;
        this.player_count = playerCount;
        this.players = players;
    }

    leaderboard()
    { // Activity 2 a
        var swapped; //Bubble Sort
        do
        {
            swapped = false;
            for (var i = 0; i < this.player_count-1; i++)
            {
                if (parseInt(this.players[i].score) > parseInt(this.players[i+1].score))
                {
                    var temp = this.players[i];
                    this.players[i] = this.players[i + 1];
                    this.players[i + 1] = temp;
                    swapped = true;
                }
            }
        } while ( swapped );
        swapped = false;
       
        do
        {
            swapped = false;
            for ( var i = 0; i < this.player_count - 1; i++ )
            {
                if ( parseInt( this.players[i].hole ) > parseInt( this.players[i + 1].hole ) )
                {
                    var temp = this.players[i];
                    this.players[i] = this.players[i + 1];
                    this.players[i + 1] = temp;
                    swapped = true;
                }
            }
        } while ( swapped );

    }

    toJSON()
    {
        let tournString = "{ \"tournament\": {\n" +
            "\t" + "\"name\": \"" + this.name + "\",\n" +
            "\t" + "\"start date\": \"" + this.start_date + "\",\n" +
            "\t" + "\"end date\": \"" + this.end_date + "\",\n" +
            "\t" + "\"award\": \"" + this.award + "\",\n" +
            "\t" + "\"yardage\": \"" + this.yardage + "\",\n" +
            "\t" + "\"par\": \"" + this.par + "\",\n" +
            "\t" + "\"round\":\"" + this.round + "\",\n" +
            "\t" + "\"players\": \"" + this.player_count + "\",\n" +
            "\t" + "\"players\": \[\n";
        let playersString = "";
        for ( var i = 0; i < this.player_count; i++ )
        {
            playersString += "\t\t" + this.players[i].toJSON();
            if ( i == this.player_count - 1 )
            {
                playersString += "\n" +
                    "\t]\n";
            }
            else
            {
                playersString += ",\n"
            }
        }

        return tournString + playersString + "\t}\n}";

    }

    validateData()
    {
        let result = true;

        if ( this.round_completion == "completed" )
        { //Activity 1 #1
            for (var player in this.players)
            {
                if (player.hole != "finished")
                {
                    result = false;
                }
            }
        }

        if ( this.round > 4 )
        { // Activity 1 #2
            result = false;
        }

        for ( var player in this.players )
        { //Activity 1 #3
            if (player.hole > 18 && this.round != 4)
            {
                result = false;
            }
        }
        return result;
    }

    static projectScoreByIndividual(tournament)
    { //Activity 2 b
        let projectedTournament = JSON.parse(tournament.toJSON())["tournament"];
        let projectedPlayers = projectedTournament.players;

        for ( var i = 0; i < projectedTournament.players.length; i++ )
        {
            if ( projectedPlayers[i].hole != "finished" )
            {
                let projectedScore = ( projectedPlayers[i].score / projectedPlayers[i].hole ) * ( 18 - projectedPlayers[i].hole );
                projectedPlayers[i].score = projectedScore;
            }
        }
        
        return projectedTournament;
    }

    static projectedLeaderboard(tournament, projectionMethod)
    {
        let projectedTournament = projectionMethod( tournament );

        var swapped; //Bubble Sort
        do
        {
            swapped = false;
            for ( var i = 0; i < projectedTournament.player_count - 1; i++ )
            {
                if ( parseInt( projectedTournament.players[i].score ) > parseInt( projectedTournament.players[i + 1].score ) )
                {
                    var temp = projectedTournament.players[i];
                    projectedTournament.players[i] = projectedTournament.players[i + 1];
                    projectedTournament.players[i + 1] = temp;
                    swapped = true;
                }
            }
        } while ( swapped );
        swapped = false;

        do
        {
            swapped = false;
            for ( var i = 0; i < projectedTournament.player_count - 1; i++ )
            {
                if ( parseInt( this.players[i].hole ) > parseInt( projectedTournament.players[i + 1].hole ) )
                {
                    var temp = projectedTournament.players[i];
                    projectedTournament.players[i] = projectedTournament.players[i + 1];
                    projectedTournament.players[i + 1] = temp;
                    swapped = true;
                }
            }
        } while ( swapped );
        return projectedTournament;
    }

}

class GolfPlayer
{
    constructor(lastname, firstinitial, score, hole)
    {
        this.lastname = lastname;
        this.firstinitial = firstinitial;
        this.score = score;
        this.hole = hole;
    }
    
    toJSON()
    {
        return("{\"lastname\": \"" + this.lastname + "\", " +
            "\"firstinitial\": \"" + this.firstinitial + "\", " + 
            "\"score\": \"" + this.score + "\", " +
            "\"hole\": \"" + this.hole + "\" }");
    }

    static projectScoreByHole(player, tournament)
    {
        let projectedPlayer = player;
        projectedPlayer.score = parseFloat(projectedPlayer.score) + ( tournament.par / 18 );
        return projectedPlayer;

    }
}

function XMLtoJSON( xml )
{
    var js_obj = {};
    if ( xml.nodeType == 1 )
    {
        if ( xml.attributes.length > 0 )
        {
            for ( var j = 0; j < xml.attributes.length; j++ )
            {
                var attribute = xml.attributes.item( j );
                js_obj[attribute.nodeName] = attribute.value;
            }
        }
    }
    else if ( xml.nodeType == 3 )
    {
        return;
    }
    else if ( xml.nodeType == 8 )
    {
        return;
    }
    if ( xml.hasChildNodes() )
    {
        for ( var i = 0; i < xml.childNodes.length; i++ )
        {
            var item = xml.childNodes.item( i );
            var nodeName = item.nodeName;
            if ( typeof ( js_obj[nodeName] ) == "undefined" )
            {
                js_obj[nodeName] = XMLtoJSON( item );
            }
            else
            {
                if ( typeof ( js_obj[nodeName].push ) == "undefined" )
                {
                    var old = js_obj[nodeName];
                    js_obj[nodeName] = [];
                    js_obj[nodeName].push( old );
                }
                js_obj[nodeName].push( XMLtoJSON( item ) );
            }
        }
    }
    return js_obj;
};

function openXMLFile( xmlFile )
{
    xmlhttp.open( "GET", xmlFile, false );
    xmlhttp.send();
    return xmlhttp.responseXML;
}

function parseTournamentDetails( tourn, players )
{
    let name = tourn["tournament-name"];
    let start_date = tourn["start-date-time"];
    let end_date = tourn["end-date-time"];
    let award = tourn["award"]["value"];
    let yardage = tourn["course"]["yardage"];
    let par = tourn["course"]["par"];
    let round = tourn["round"]["number"];
    let round_completion = tourn["round"]["status"];
    let player_count = players.length;

    let player_array = [];
    
    for ( var i = 0; i < players.length; i++ )
    {
        let nameLast = players[i]["player-metadata"]["name"]["last"];
        let firstInitial = players[i]["player-metadata"]["name"]["first"].charAt( 0 );
        let score = players[i]["player-stats"]["score"];
        let hole = players[i]["player-stats"]["player-stats-golf"]["stats-golf-round"]["stats-golf-hole"]["hole"];

        let player = new GolfPlayer( nameLast, firstInitial, score, hole );
        player_array.push( player );
        
    }
    let tournament = new GolfTournament( name, start_date, end_date, award, yardage, par, round, round_completion, player_count, player_array );
    return tournament;
}

if ( window.XMLHttpRequest )
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
}

var xmlDoc = openXMLFile( "./data/golf1.xml" );

var rawJSONObject = XMLtoJSON( xmlDoc );
var golfJSONObject = rawJSONObject["golf"]; //before applying assignment schema

var tournamentData = golfJSONObject["tournament"]["tournament-metadata"];
var tournamentPlayers = golfJSONObject["tournament"]["player"];

var test = parseTournamentDetails( tournamentData, tournamentPlayers ); //After applying assignment schema

console.log( GolfTournament.projectScoreByIndividual(test));
console.log( GolfPlayer.projectScoreByHole( test.players[0], test ) );
console.log( GolfTournament.projectedLeaderboard( test, GolfTournament.projectScoreByIndividual ) );

document.getElementById( "json" ).innerHTML = test.toJSON();