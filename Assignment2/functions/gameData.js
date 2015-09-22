"use strict";
var GAME_PIECES_FILES = "../data/gamePieces.json";
var gameJSON;
var secret;

var players =
{
    "computer":
    {
    }
};

function getPlayer(name)
{
    return players[name];
}

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

function generateSecret()
{
    secret =
    {
        "room": rooms[parseInt(Math.random() * availableRoomCards.length)],
        "guest": guests[parseInt(Math.random() * availableGuestCards.length)],
        "weapon": weapons[parseInt(Math.random() * availableWeaponCards.length)]
    };

    let roomIndex = availableRoomCards.indexOf(secret["room"]);
    availableRoomCards.splice(roomIndex, 1);

    let guestIndex = availableGuestCards.indexOf(secret["guest"]);
    availableGuestCards.splice(guestIndex, 1);

    let weaponIndex = availableWeaponCards.indexOf(secret["weapon"]);
    availableWeaponCards.splice(weaponIndex, 1);

    console.log(secret);
}

function assignPlayerCards(name)
{
    let playerCount = Object.keys(players).length;
    for (let i = 0; i < availableRoomCards.length/playerCount; i++)
    {
        let randomIndex = parseInt(Math.random() * availableRoomCards.length);
        players[name]["cards"]["rooms"].push(availableRoomCards[randomIndex]);
        availableRoomCards.splice(randomIndex, 1);
    }

    for (let i = 0; i < availableGuestCards.length / playerCount; i++) {
        let randomIndex = parseInt(Math.random() * availableGuestCards.length);
        players[name]["cards"]["guests"].push(availableGuestCards[randomIndex]);
        availableGuestCards.splice(randomIndex, 1);
    }

    for (let i = 0; i < availableWeaponCards.length / playerCount; i++) {
        let randomIndex = parseInt(Math.random() * availableWeaponCards.length);
        players[name]["cards"]["weapons"].push(availableWeaponCards[randomIndex]);
        availableWeaponCards.splice(randomIndex, 1);
    }
}

function addPlayer(name)
{
    players[name] = {
        "cards": {
            "rooms": [],
            "guests": [],
            "weapons": []
        }
    };
}