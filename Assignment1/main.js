"use strict";
var xmlhttp;

class GolfTournament
{
    constructor( name, start_date, end_date, award, yardage, par, round, playerCount, players )
    {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.award = award;
        this.yardage = yardage;
        this.par = par;
        this.round = round;
        this.playerCount = playerCount;
        this.players = players;
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
            "\t" + "\"players\": \"" + this.playerCount + "\",\n" +
            "\t" + "\"players\": \[\n";
        let playersString = "";
        for (var i = 0; i < this.playerCount; i++)
        {
            playersString += "\t\t" + this.players[i].toJSON();
            if (i == this.playerCount - 1)
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
    let tournament = new GolfTournament( name, start_date, end_date, award, yardage, par, round, player_count, player_array );
    console.log( tournament.toJSON() );
    return tournament.toJSON();
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
var golfJSONObject = rawJSONObject["golf"];

var tournamentData = golfJSONObject["tournament"]["tournament-metadata"];
var tournamentPlayers = golfJSONObject["tournament"]["player"];

var test = parseTournamentDetails( tournamentData, tournamentPlayers );
var output = JSON.parse( test );
console.log( output );

document.getElementById( "json" ).innerHTML = test;