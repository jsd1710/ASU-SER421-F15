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

function loadClueJSON()
{
    let request = new XMLHttpRequest();
    request.open("GET", GAME_PIECES_FILES, false);

    request.onreadystatechange = function ()
    {
        if (request.readyState == 4 && request.status == 200)
        { //if done loading and okay.
            if (request.responseText)
            {
                gameJSON = JSON.parse(request.responseText);
            }
            else
            {
                console.log("Your JSON file is empty.");
            }
        }
        else if (request.readyState == 4)
        { //if done loading and not okay.
            console.log("The game-pieces file does not exist!");
            return false;
        }
        
    };
    request.send(null);
}

function getClueJSON()
{
    if (!gameJSON)
    {
        loadClueJSON();
    }
    return gameJSON;
}