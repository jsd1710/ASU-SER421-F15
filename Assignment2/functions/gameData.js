"use strict";
var GAME_PIECES_FILES = "../data/gamePieces.json";
var gameJSON;

function getRooms()
{
    return gameJSON["Rooms"];
}

function getGuests()
{
    return gameJSON["Guests"];
}

function getWeapons() {
    return gameJSON["Weapons"];
}

function getClueJSON()
{
    let request = new XMLHttpRequest();
    request.open("GET", GAME_PIECES_FILES, false);
    request.send(null);
    gameJSON = JSON.parse(request.responseText);
}

//Initialization
getClueJSON();